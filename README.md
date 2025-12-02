# DocChat – AI-Powered Document Query Assistant

DocChat is an AI-powered document chatbot that allows users to upload documents (PDF, DOCX, TXT) and ask questions about them. It extracts content, processes it using NLP, and provides context-aware answers using RAG (Retrieval-Augmented Generation).

---

## 🚀 Features

- 📂 Upload & parse PDFs, DOCX, and TXT files
- 💬 Ask questions and receive document-specific answers
- 🧠 Uses vector embeddings for efficient chunk retrieval
- ⚙️ RAG-based architecture 
- 🌐 Full Dockerized backend setup
- ✅ Clean UI with Tailwind + React + Vite

---

## 🧠 Tech Stack


 Frontend - React, TailwindCSS, Vite               
 Backend  - FastAPI, Python, Langchain             
 Embeddings - Google Vertex AI / OpenAI              
 Vector DB  - Qdrant                                 
 Queue  - Redis + RQ                             
 File Parsing - PyMuPDF, python-docx, chardet          
 Container - Docker, Docker Compose                 

---


## 🛠️ Setup Instructions

### 1. Clone the repository
git clone https://github.com/derek-aman/DocChat.git


### 2. Create a .env file in the root
Add your API keys and secrets:
GOOGLE_API_KEY=your_google_key


3. Run with Docker Compose
docker-compose up --build


4. Access the app
Frontend: http://localhost:5173
Backend: http://localhost:8000/docs
Qdrant: http://localhost:6333
Redis: http://localhost:6379


📁 Project Structure

DocChat/
├── backend/
│   ├── main.py
│   ├── server.py
│   ├── pdf_worker.py
│   └── query_worker.py
├── frontend/
│   ├── src/
│   └── ...
├── docker-compose.yml
├── .env
└── README.md

✨ Author
Made by Aman Kumar








