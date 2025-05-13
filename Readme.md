
# 🧠 BioMentor Summarization Module

A powerful, modular AI component designed for the **BioMentor Personalized E-Learning Platform**, optimized for summarizing biology content, generating structured notes, and producing voice-based outputs for A/L Biology students.

---

## 📦 Project Overview

This module supports both **Monolithic** and **Microservices** architectures. It allows users to:

- Upload educational documents
- Generate intelligent summaries using a fine-tuned LLM
- Retrieve answers to biology-related queries (RAG-based)
- Create structured revision notes
- Convert summaries to audio
- Download outputs as PDF and MP3

---

## 🧩 Component Breakdown

### 🔹 1. **Monolithic Architecture**

**Directory**: `Monolithic-Architecture/`

A single FastAPI app that handles:
- Document parsing
- Summarization (Flan-T5 with RAG)
- Voice generation (Text-to-Speech)
- File handling and download generation

Best for:
- Fast deployment
- Fewer system resources
- Centralized debugging

### 🔹 2. **Microservices Architecture**

**Directory**: `Microservices-Architecture/`

Fully modularized backend with the following services:

| Component               | Description |
|------------------------|-------------|
| `api_gateway`          | Central FastAPI gateway for routing requests |
| `file_service`         | Handles document uploads and preprocessing |
| `text_extraction_service` | Extracts raw text from PDFs, DOCX, etc. |
| `summarization_service` | Applies summarization logic with RAG pipeline |
| `voice_service`        | Converts summarized text to audio |
| `docker-compose.yml`   | Orchestrates all services using Docker |

Use this version when:
- You need better fault isolation
- You prefer containerized deployments
- Working with a DevOps pipeline

---

## 📁 Directory Structure

```
Summarization/
├── Monolithic-Architecture/
│   ├── tests/
│   ├── utils/
│   ├── logging_config.yaml
│   ├── requirements.txt
│   ├── file_handler.py
│   ├── summarization.py
│   ├── summarization_functions.py
│   ├── voice_service.py
│   ├── text_extraction_service.py
│   ├── rag.py
│   └── ...
├── Microservices-Architecture/
│   ├── api_gateway/
│   ├── file_service/
│   ├── summarization_service/
│   ├── voice_service/
│   └── docker-compose.yml
```

---

## 🔌 API Endpoints (Monolith)

| Endpoint                    | Method | Description |
|----------------------------|--------|-------------|
| `/process-document/`       | POST   | Summarize a file |
| `/process-query/`          | POST   | Query-based summary |
| `/summarize-text/`         | POST   | Plain text summary |
| `/generate-notes/`         | POST   | Structured notes |
| `/download-summary-text/`  | GET    | Download summary PDF |
| `/download-summary-audio/` | GET    | Download MP3 |
| `/download-notes/`         | GET    | Download notes PDF |

---

## 🖥️ Running the Services

### ✅ Monolithic

```bash
cd Monolithic-Architecture
python3.12 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn summarization:app --host 0.0.0.0 --port 8002
```

### ⚙️ User Management

```bash
cd ../User-Management/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

### 🌐 Frontend

```bash
cd ../Frontend/
npm install
npm start
```

Ensure `.env` or config is set to communicate with APIs at ports 8001 and 8002.

---

## 🐳 Running with Microservices

```bash
cd Microservices-Architecture
docker-compose up --build
```

---

## ⚙️ Deployment & CI/CD

- Hosted on **Azure VM (Ubuntu 24.04)**
- Managed via `systemd`
- Nginx reverse proxy (port 80 → 8002)
- GitHub Actions for CI/CD:
  - On push to `main`: Pull, install, restart service

---

## 🧪 Testing

```bash
pytest tests/
```

Tests:
- Summarization logic
- File and PDF processing
- Audio generation
- RAG query answering

## 🔍 Example Request

```bash
curl -X POST http://<VM-IP>/summarize-text/ -F "text=The mitochondria is the powerhouse of the cell" -F "word_count=150"
```

---

## 📊 Monolithic vs Microservices Performance

| Feature              | Monolithic             | Microservices             |
|----------------------|------------------------|----------------------------|
| Response Time        | ✅ 85% faster           | ❌ Slower (API overhead)   |
| CPU & RAM Usage      | ✅ Lower (34% CPU, 28-36% RAM) | ❌ Higher (43–62% CPU, 37–40% RAM) |
| Deployment Speed     | ✅ 37.8 mins            | ❌ 71.5 mins               |
| Debugging            | ✅ Easier, centralized  | ❌ Harder, distributed     |
| Fault Tolerance      | ❌ Lower (single point) | ✅ Higher (isolated)       |
| Infrastructure       | ✅ Simple               | ❌ Complex (multi-container) |

---

