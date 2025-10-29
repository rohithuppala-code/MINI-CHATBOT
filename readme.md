# Mini Chatbot

A simple AI chatbot using Groq API, Flask backend, and React frontend.

## 📁 Folder Structure

```
chatbot-project/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── .env
```

## Steps to Run

### 1. Get Groq API Key
- Go to https://console.groq.com/
- Create an account and get your API key

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Add your API key to .env file: GROQ_API_KEY=your_key_here
python app.py
```

### 3. Frontend Setup (New Terminal)
```bash
edit your vite config.js file with port used in backend to avoid cors issues.

cd frontend
npm install
npm run dev
```

### 4. Open Browser
```
http://localhost:5173
```

## 🛠️ Tech Stack
- **Backend:** Flask + Groq API
- **Frontend:** React + Vite + Tailwind CSS

## 📝 Environment Variables

**backend/.env**
```
GROQ_API_KEY=your_groq_api_key_here
```

**frontend/.env**
```
VITE_API_URL=/api
```