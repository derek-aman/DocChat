import 'dotenv/config';
import { Worker } from 'bullmq';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';  // ✅ Ensure this import exists
import { QdrantVectorStore } from '@langchain/qdrant';
import fs from 'fs/promises';
import { connection } from './redis.js';



const worker = new Worker(
  'file-upload-queue',
  async (job) => {
    console.log('Received job:', job.data);

    const data = typeof job.data === 'string' ? JSON.parse(job.data) : job.data;
    try{
    const loader = new PDFLoader(data.path);
    const docs = await loader.load();

    const splitter = new CharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const docsSplitted = await splitter.splitDocuments(docs);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: 'models/gemini-embedding-exp-03-07',
      apiKey: process.env.GOOGLE_API_KEY
    });

    await QdrantVectorStore.fromDocuments(
      
      docsSplitted,
      embeddings,
      {
        // url: 'http://localhost:6443',
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: 'pdf-docs',
      }
    );

    

    // await vectorStore.addDocuments(docs);
    console.log('📚 All documents have been added to Qdrant vector store.');
    await fs.unlink(data.path).catch(() => {});

    console.log('🗑️ Temp file deleted:', data.path);
    } catch (err) {
      console.error('❌ Worker failed:', err);
      throw err;
    }
  },
  {
    concurrency: 1,
    // connection: {
    //   host: 'localhost',
    //   port: 6380,
    //    // ensures resilience (§persistent connections docs) :contentReference[oaicite:1]{index=1}
    // },
    connection,
  }
);


worker.on('completed', (job) => console.log(`✅ Job ${job.id} completed.`));
worker.on('failed', (job, err) => console.error(`❌ Job ${job.id} failed:`, err));
worker.on('error', (err) => console.error('Worker encountered an error:', err));