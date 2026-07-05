# DocuChat

AI-powered Document Chatbot using Retrieval-Augmented Generation (RAG).

## Overview

This repository contains the DocuChat application, which lets users upload documents and ask questions about their contents. It uses a React frontend, a Node.js backend, and a Python AI service to process documents, generate embeddings, and answer queries from the document context.

## Contents

- `DOCUCHAT/` - main application folder
  - `newapp/` - frontend and backend application code
  - `backend/python_services/Rag_service/` - Python service for document processing and RAG logic

## Features

- Document upload and ingestion
- Document text extraction and chunking
- Vector embeddings with ChromaDB
- Semantic search over document content
- RAG-powered Q&A using a Groq LLM backend
- Uses `langchain-docling` for document loading and processing

## How to run

1. Open the project in your terminal:

```powershell
cd path\to\DOCUCHAT\newapp
```

2. Start the frontend:

```powershell
npm install
npm start
```

3. Start the backend in a separate terminal:

```powershell
cd backend
npm install
node server.js
```

4. Start the Python AI service in another terminal:

```powershell
cd backend\python_services
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python Rag_service\main.py
```

## Notes

- The service uses `langchain-docling` for document loading and chunking.
- The project stores document embeddings in a local ChromaDB directory.
- If you are using Windows PowerShell, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` once before activating `.venv`.
