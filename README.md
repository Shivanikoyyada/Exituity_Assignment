# 📂 Exituity Assessment — File Upload & Normalization System

This project enables users to upload **JSON or CSV** files, automatically **parse & normalize** the data, and display it in a structured table. Users can also **download the normalized JSON output**.

---

## ✨ Key Features

| Feature | Description |
|--------|-------------|
📁 Upload JSON / CSV | Supports structured data uploads  
⚙️ Auto Normalization | Converts input data into consistent JSON  
📊 Table View | View normalized data in table format  
⬇️ Download JSON | Export normalized data  
🔍 Input Validation | Only JSON/CSV allowed  
🎨 Clean UI | Bordered table + modern design  

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- PapaParse (CSV → JSON)
- CSS (clean bordered UI)

### Backend
- Node.js + Express
- Multer (file upload handling)
- FS module for reading files

---

## 🚀 Setup Instructions
Backend Setup
cd backend
npm install
npm start

Frontend Setup
cd frontend
npm install
npm start


✅ Backend: http://localhost:5000
✅ Frontend: http://localhost:3000

### Clone Repo
```bash
git clone https://github.com/Shivanikoyyada/Exituity_Assignment.git

🧪 How to Use
-Upload JSON/CSV file
-System normalizes the data
-Normalized data shown in table
-Click Download JSON for export

📁 Project Structure
Exituity_Assignment/
 ├── backend/
 │   ├── routes/
 │   ├── controller/
 │   ├── middleware/
 │   └── uploads/
 └── frontend/
     ├── src/components/
     └── public/

🧠 Notes & Assumptions
Designed for clean pipeline:
Upload → Parse → Normalize → View → Download

Extendable for:
-Database storage
-API integration
-Multi-service architecture
