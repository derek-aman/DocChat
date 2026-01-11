import express from 'express';
import multer from 'multer';
import cors from 'cors';
import {Queue} from 'bullmq';
import { connection } from './redis.js';

import 'dotenv/config';

import { GoogleGenerativeAI } from "@google/generative-ai";
// import { CharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';  // ✅ Ensure this import exists
import { QdrantVectorStore } from '@langchain/qdrant';



const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY, { checkCompatibility: false });


const queue = new Queue('file-upload-queue', {
    // connection:{
    //     host: 'localhost',
    //     port: 6380,

    // },
    connection,
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
  try {
    const userQuery = req.query.message;

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: 'models/gemini-embedding-exp-03-07', // Updated to a standard embedding model name
      // model: 'text-embedding-004',
      apiKey: process.env.GOOGLE_API_KEY
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        // url: 'http://localhost:6443',
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: 'pdf-docs',
      }
    );

    const ret = vectorStore.asRetriever({ k: 1 });
    const result = await ret.invoke(userQuery);
    const context = result.map(r => r.pageContent).join('\n\n');

    const SYSTEM_PROMPT = `
You are a knowledgeable and precise AI assistant.

Your task is to answer the user's question **strictly using the provided context** extracted from uploaded PDF documents.

Rules:
- Use ONLY the information present in the context.
- If the answer is not explicitly available in the context, say:
  "I couldn't find this information in the provided document."
- Do NOT make assumptions or add external knowledge.
- Be concise, clear, and well-structured.
- If relevant, use bullet points or numbered steps.
- Preserve technical accuracy and terminology from the document.

Context:
${context}
`;


    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    
    const chatResult = await model.generateContent([
      SYSTEM_PROMPT, 
      userQuery
    ]);

    
    const text = chatResult.response.text();

    return res.json({ content: text, docs: result });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(8000, () => console.log(`server started on PORT: 8000`));

