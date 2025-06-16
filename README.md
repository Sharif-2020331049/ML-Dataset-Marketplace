
# 🧠 ML Dataset Marketplace

A full-stack web platform that allows users to **buy** and **sell** machine learning datasets (ZIP, audio, text files). Built with the **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## 🚀 Features

- 🔐 User authentication with JWT (Login/Register)
- 📦 Upload ZIP, text, audio datasets as a seller
- 🔍 Browse and search for datasets as a buyer
- 🛒 Dataset purchase/download system (in progress)
- ☁️ Uploadcare integration for file storage (supports ZIP)
- 📁 Admin dashboard for managing users & datasets
- ⚙️ Backend API for datasets and user management

---

## 🧰 Tech Stack

| Category      | Tech                                           |
|---------------|------------------------------------------------|
| Frontend      | React, Tailwind CSS, Lucide Icons              |
| Backend       | Node.js, Express.js                            |
| Database      | MongoDB (Mongoose)                             |
| Auth          | JWT, bcrypt                                    |
| File Storage  | Uploadcare (replacing Cloudinary for ZIP)      |
| Dev Tools     | VS Code, GitHub, Postman                       |

---

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/Sharif-2020331049/ML-Dataset-Marketplace.git
cd ML-Dataset-Marketplace

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Set environment variables
# Create a `.env` file in /backend and add:
# MONGO_URI=your_mongodb_url
# JWT_SECRET=your_secret_key
# UPLOADCARE_PUBLIC_KEY=your_uploadcare_key
# UPLOADCARE_SECRET_KEY=your_uploadcare_secret

# 5. Run the application
# In two terminals:
npm run dev  # backend
npm start    # frontend
```

---

## 🧪 API Endpoints

- `POST /api/auth/register` – Register a user
- `POST /api/auth/login` – Login and get token
- `POST /api/datasets/upload` – Upload dataset (ZIP, audio, etc.)
- `GET /api/datasets` – Get all datasets
- `GET /api/datasets/:id` – Get specific dataset

---

## 🔐 Environment Variables

Create `.env` in your backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
UPLOADCARE_PUBLIC_KEY=your_uploadcare_public_key
UPLOADCARE_SECRET_KEY=your_uploadcare_secret_key
```

---

## 📂 Folder Structure

```
ML-Dataset-Marketplace/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
└── README.md
```

---

## 🙋‍♂️ Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

- **GitHub:** [@Sharif-2020331049](https://github.com/Sharif-2020331049) [@Shamim-32](https://github.com/Shamim-32)

---

## ⭐️ Star the repo if you like it!

> Made with ❤️ for the ML/AI community
