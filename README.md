#  Social Media Content Analyzer 
## 📖 Description

Social Media Content Analyzer is a full-stack AI-driven application that analyzes PDF and Image content (PNG, JPG, JPEG) and provides insights to improve social media engagement.
It extracts text, performs keyword analysis, sentiment detection, readability evaluation, hashtag suggestions, category classification and platform-specific optimization.

The tool is designed for content creators, marketers, businesses, and students who want to increase visibility and interaction on social media.

🔗 Live Demo : 👉 https://contentanalyzer1.netlify.app/

⚠️ Render(for Backend) takes 1–2 minutes to load the first time (cold start). Please wait.

## ❗ Problem Statement

### Content creators often struggle with:

1. Knowing whether their content will perform well online

2. Finding effective hashtags

3. Understanding readability and engagement score

4. Analyzing text inside images / PDFs

This project solves that problem using AI-based content analytics.

## 💡 Approach / Methodology

``` To build the Social Media Content Analyzer, the main idea was to design a tool that could help creators instantly understand how effective their content might be on social media. The first step was creating a strong backend capable of reading different types of files. For this, Node.js and Express were used to build a clean and reliable API. Two separate extraction techniques were combined: PDF text parsing to read regular documents and OCR (Tesseract) to extract text from images. This ensured that even scanned documents or screenshots could be analyzed without manual rewriting. Once the text was extracted, the next focus was meaningful analysis instead of just raw output. A custom NLP module was developed to calculate sentiment score, keyword frequency, readability, and engagement score. Platform-based suggestions and ideal posting times were also generated to give users direct and practical insights they can apply immediately. ```

### Steps	Action
1️⃣	User uploads a PDF or Image 

2️⃣	Backend extracts text using OCR & PDF Parsers

3️⃣	NLP models compute sentiment, readability, keywords, engagement score

4️⃣	Platform-wise performance and best posting times predicted

5️⃣	Frontend visualizes insights using charts, tables, and word-cloud

## 🏗️ System Architecture
Frontend (React + Vite + CSS)

 ⬇️REST API (Axios / Fetch)

Backend (Node.js + Express)

   ⬇️ NLP / OCR

Text Extraction (Tesseract + PDF Parser)

   ⬇️
   
   AI-based Analytics (Keyword frequency + Sentiment + Readability)
   


---

## 🔧 Tech Stack

### 🎨 Frontend
| Technology | Use |
|------------|-----|
| React | UI Framework |
| Vite | Build Tool |
| React Router | SPA Routing |
| Chart.js | Charts |
| WordCloud.js | Word Cloud |
| CSS | Styling |

### 🧠 Backend
| Technology | Use |
|------------|-----|
| Node.js | Runtime |
| Express.js | REST API |
| Tesseract OCR | Image Text Extraction |
| PDF Parser | PDF Text Extraction |
| Natural Language Processing | Analytics Engine |

### ☁ Deployment
| Service | Purpose |
|--------|---------|
| Render | Backend Hosting |
| Netlify | Frontend Hosting |

---

## 📂 Folder Structure (High-Level)
```
📁 project-root
├── 📁 backend
│  ├── server.js
│  ├── routes/
│  ├── controllers/
│  ├── utils/
│  ├── .env
└── 📁 frontend
   ├── index.html
   ├── src/
   │ ├── components/
   │ ├── pages/
   │ ├── services/
   ├── .env
```

---

## ⚙️ Installation & Usage (Local Setup)

### 🔹 1️⃣ Backend Setup
```sh
cd backend
npm install



Create .env file:

PORT=4000
MAX_CONTENT_LENGTH=20000000
PREFER_LOCAL_TESSERACT=true
LOG_LEVEL=info


Run server:

node server.js
```

### 🔹 Frontend Setup
```sh
cd frontend
npm install


Create .env file:

VITE_API_URL=http://localhost:4000


Run frontend:

npm run dev

```

#### 🌍 Deployment Instructions

Backend (Render)

- Push backend folder to GitHub

- Deploy on Render → Web Service

- Set Build Command: npm install

- Start Command: node server.js

- Copy deployed Render URL and update it in frontend .env:

``` VITE_API_URL=https://your-render-server.onrender.com ```

#### Frontend (Netlify)

- Push frontend to GitHub

- Deploy on Netlify

- Set Build Command: npm run build

- Set Publish Directory: dist

- Add environment variable:

``` VITE_API_URL=https://your-render-server.onrender.com```

## 📊 Features Implemented
- PDF Text Extraction	
- Image OCR	
- Keyword Frequency Chart	
- Word Cloud	
- Sentiment Analysis	
- Readability Score	
- Hashtag Suggestions	
- Download & Share Insights	
- Fully Responsive UI	



### 🧑‍💻 Developed By 

Name	- Ansh Rathore

College - Motilal Nehru National Institute of Technology Allahabad



## Screenshots

![App Screenshot](./Screenshots/Screenshot%202025-11-25%20151508.png)


![App Screenshot](./Screenshots/Screenshot%202025-11-25%20151523.png)


![App Screenshot](./Screenshots/Screenshot%202025-11-25%20151423.png)


![App Screenshot](./Screenshots/Screenshot%202025-11-25%20151444.png)






