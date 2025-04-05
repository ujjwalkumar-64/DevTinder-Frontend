# 🚀 DevTinder Frontend

This is the **frontend** of the DevTinder application — a platform to connect developers based on skills, interests, and collaboration goals.

👉 **Live Site**: [http://13.232.143.33](http://13.232.143.33)

---

## 🧰 Tech Stack

- **Vite + React**
- **Tailwind CSS** & **Daisy UI**
- **React Router**
- **Redux Toolkit**
- **Axios**
- **Razorpay JS SDK**

---

## 🎯 Features

- 🔐 Authentication (Login/Register)
- 👤 Profile creation and editing
- 📱 Developer feed with swipe-style connection requests
- ✅ Accept/Reject connection requests
- 👥 View current connections and incoming/outgoing requests
- 💬 **Real-time chat** enabled after successful match
- 💳 **Razorpay-based subscription/payment** to unlock premium features
- 🔒 Protected routes with JWT + Redux state

---

## 🛠️ Installation

```bash
git clone https://github.com/ujjwalkumar-64/DevTinder-Frontend.git
cd DevTinder-Frontend
npm install
npm run dev
📌 .env Configuration
Create a .env file in the root directory with:

env
Copy
Edit
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_key
📂 Project Structure
pages/ – Screens like Feed, Chat, Subscription, etc.

components/ – Reusable UI components

store/ – Redux Toolkit slices

services/ – Axios API methods

utils/ – Razorpay integration logic

🔗 Backend Reference
This frontend connects to the DevTinder backend:

👉 DevTinder Backend Repository

🧠 Future Improvements
Advanced filters for developer search

User status indicators (online/offline)

Chat notifications

🤝 Contributing
Fork the repo

Create a new branch: git checkout -b feature/YourFeature

Make your changes and commit: git commit -m 'Add your feature'

Push to the branch: git push origin feature/YourFeature

Open a Pull Request

## 📄 License
[MIT](./LICENSE)
```


