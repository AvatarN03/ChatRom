# 💬 ChatRom – MERN Real-Time Chat App

A full-featured real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js), powered by **Socket.IO** for instant messaging and **Zustand** for efficient global state management.

---

## 🚀 Features

- **User Authentication & Registration**  
  Secure sign-up and login with JWT & bcryptjs.
- **Real-Time 1:1 Messaging**  
  Instant WebSocket messaging with Socket.IO.
- **Global State Management**  
  Lightweight state handling using Zustand.
- **RESTful API**  
  Robust backend with Express & MongoDB (Mongoose).
- **Online/Offline User Indicators**  
  See who’s available in real-time.
- **Live Typing Status**  
  Know when someone is typing.
- **Responsive UI**  
  Modern, mobile-friendly interface with React & Tailwind CSS.
- **Timestamps on Messages**  
  Each message displays when it was sent.
- **Deployment Ready**  
  Easily deployable to cloud platforms.

---

## 📚 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Credits](#-credits)
- [License](#-license)
- [Author](#-author)

---

## 📸 Screenshots

*Server Directory Structure* <br/>
![Server tree](https://github.com/user-attachments/assets/589c73e8-2a1d-4523-bc10-dabbda5d025d)

---

*Client Directory Structure* <br/>
![Client tree](https://github.com/user-attachments/assets/a78fafd1-3939-4571-b43a-7e6314b2c29a)

---

## 🏗️ Tech Stack

**Frontend**
- React.js (Vite)
- Zustand
- Axios
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- Socket.IO
- MongoDB (Mongoose)
- JWT
- bcryptjs

---

## 🧰 Installation

1. **Clone the repository**
    ```
    git clone https://github.com/AvatarN03/ChatRom.git
    ```

2. **Install dependencies**
    ```
    # Client
    cd client
    npm install

    # Server
    cd ../server
    npm install
    ```

3. **Configure Environment Variables**
    - Create a `.env` file in the `server/` directory.
    - Use the template in `server/sample-env.txt` for required variables.

4. **Run the application**
    ```
    # Start backend
    cd server
    npm run dev

    # In a new terminal, start frontend
    cd ../client
    npm run dev
    ```

---

## 💡 Usage

- Register or log in to start chatting.
- View online users and their statuses.
- Send and receive real-time messages and typing indicators.
- Enjoy a seamless chat experience across devices.

---

## 🙌 Credits

- [Codesistency](https://www.youtube.com/@codesistency)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ✍️ Author

**Prashanth Naidu**  
[LinkedIn](https://www.linkedin.com/in/prashanth-naidu03/)

---

_Last updated: May 23, 2025_
