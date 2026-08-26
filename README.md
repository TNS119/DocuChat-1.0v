# DocuChat

DocuChat is an AI-powered document chatbot. Upload a PDF, then ask questions about its contents using retrieval-augmented generation (RAG).

## Architecture

The project is split into three parts:

- `DOCUCHAT_TNS/frontend/` - React web application
- `DOCUCHAT_TNS/backend/` - FastAPI application for authentication, uploads, and chat requests
- `DOCUCHAT_TNS/modal_service/` - document-processing service used by the RAG pipeline

Uploaded documents are processed with Docling and LangChain, stored through vector-search integrations, and queried with a Groq-backed language model. MongoDB stores application data and Cloudinary stores uploaded PDFs.

## Features

- User registration and JWT authentication
- PDF upload and document ingestion
- Document extraction and chunking with `langchain-docling`
- Semantic search with ChromaDB and Qdrant integrations
- RAG-powered question answering with Groq
- Cloudinary PDF storage

## Prerequisites

- Python 3.10 or newer
- Node.js and npm
- MongoDB, Groq, Cloudinary, Hugging Face, and Qdrant credentials

## Configuration

Copy `DOCUCHAT_TNS/example.env` to `DOCUCHAT_TNS/.env` and replace the placeholder values:

```powershell
Copy-Item DOCUCHAT_TNS\example.env DOCUCHAT_TNS\.env
```

The environment file contains credentials for Groq, Hugging Face, MongoDB, Cloudinary, Modal, JWT authentication, and Qdrant. Keep `.env` private and do not commit it.

## Run locally

Start each service in a separate terminal from the repository root.

### 1. FastAPI backend

```powershell
cd DOCUCHAT_TNS\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

The API is available at `http://127.0.0.1:8000`. The interactive API documentation is at `http://127.0.0.1:8000/docs`.

### 2. React frontend

```powershell
cd DOCUCHAT_TNS\frontend
npm install
npm start
```

The web application opens at `http://localhost:3000`.

### 3. Modal document service

The document-processing service is in `DOCUCHAT_TNS/modal_service`. Deploy or run it using the Modal CLI and set the resulting URL as `MODAL_URL` in `.env`. The exact command depends on the Modal app configuration in `modal_service/app.py`.

## API overview

- `POST /auth/...` - registration and login routes
- `POST /process/{topic}` - upload and process a PDF for an authenticated session
- `POST /response` - ask a question about a processed document
- `GET /` - backend health check

Both document processing and question requests require a valid JWT bearer token.

## Development notes

- ChromaDB data is stored under `DOCUCHAT_TNS/backend/chroma_langchain_db/`.
- On Windows PowerShell, enable script execution for the current session if virtual-environment activation is blocked:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

- Run frontend tests with `npm test` and create a production build with `npm run build` from `DOCUCHAT_TNS/frontend`.
