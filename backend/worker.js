import 'dotenv/config';
import { Worker } from 'bullmq';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';  // ✅ Ensure this import exists
import { QdrantVectorStore } from '@langchain/qdrant';


const worker = new Worker(
  'file-upload-queue',
  async (job) => {
    console.log('Received job:', job.data);

    const data = typeof job.data === 'string' ? JSON.parse(job.data) : job.data;
    const loader = new PDFLoader(data.path);
    const docs = await loader.load();

    const splitter = new CharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
const docsSplitted = await splitter.splitDocuments(docs);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: 'models/gemini-embedding-exp-03-07',
      apiKey: process.env.GOOGLE_API_KEY
    });

    const vectorStore = await QdrantVectorStore.fromDocuments(
      
      docsSplitted,
      embeddings,
      {
        url: 'http://localhost:6443',
        collectionName: 'pdf-docs',
      }
    );

    await vectorStore.addDocuments(docs);
    console.log('📚 All documents have been added to Qdrant vector store.');
  },
  {
    concurrency: 100,
    connection: {
      host: 'localhost',
      port: 6380,
       // ensures resilience (§persistent connections docs) :contentReference[oaicite:1]{index=1}
    },
  }
);

worker.on('completed', (job) => console.log(`✅ Job ${job.id} completed.`));
worker.on('failed', (job, err) => console.error(`❌ Job ${job.id} failed:`, err));
worker.on('error', (err) => console.error('Worker encountered an error:', err));
