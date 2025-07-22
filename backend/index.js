import express from 'express';
import multer from 'multer';
import cors from 'cors';
import {Queue} from 'bullmq';
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
// import { CharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';  // ✅ Ensure this import exists
import { QdrantVectorStore } from '@langchain/qdrant';



const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
    
});


const queue = new Queue('file-upload-queue', {
    connection:{
        host: 'localhost',
        port: 6380,

    },
});






const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}` )
  }
})



const upload = multer({ storage : storage});

const app = express();

app.use(cors());


app.get("/", (req,res) => {
    return res.json({status: "All Good"})
});

app.post("/upload/pdf",upload.single("pdf"),async (req, res) =>{
     await queue.add('file-ready',JSON.stringify({
        filename: req.file.originalname,
        destination : req.file.destination,
        path: req.file.path,
    }))
    return res.json({message : "uploaded"});
});

app.get('/chat', async (req, res) => {
  const userQuery =  req.query.message;
   
    
      

   
  const embeddings = new GoogleGenerativeAIEmbeddings({
      model: 'models/gemini-embedding-exp-03-07',
      apiKey: process.env.GOOGLE_API_KEY
    });

   const vectorStore = await QdrantVectorStore.fromExistingCollection(
      
    //   docsSplitted,
      embeddings,
      {
        url: 'http://localhost:6443',
        collectionName: 'pdf-docs',
      }
    );
  const ret = vectorStore.asRetriever({
    k: 2,
  });
  const result = await ret.invoke(userQuery);


    const SYSTEM_PROMPT = `
  You are helfull AI Assistant who answeres the user query based on the available context from PDF File.
  Context:
  ${JSON.stringify(result)}
  `;

   const chatResult = await ai.models.generateContent({
     model: "gemini-2.5-pro",
     contents: [
        {"role": "model", "parts": [{ text : SYSTEM_PROMPT}]},
        {"role": "user", "parts": [{ text : userQuery}]},
     ],
   });

   const first = chatResult.candidates?.[0];
const text = first?.content?.parts?.[0]?.text;
   return res.json({content: text, docs: result});
});

app.listen(8000, () => console.log('server started on PORT: ${8000}'));