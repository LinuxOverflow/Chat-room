# Chat-room
Chat-room Intergrated with tor-network

🔐 Secure Real-Time Chat Application

A secure, decentralized, and real-time chat application built with Node.js, Socket.IO, file-based JSON storage, and deployed over both Ngrok (for HTTPS tunneling) and TOR Hidden Services (.onion) for anonymous access.
🧠 Inspiration

Inspired by anonymous forums and knowledge-sharing platforms on the dark web, this project was built to explore privacy-first communication. The goal was to recreate a minimal, secure chat system that supports anonymous participation, real-time messaging, and decentralization — all while hosting it in a Linux environment.
🚀 Features

    🔒 User Authentication with bcrypt-hashed passwords

    💬 Real-time Messaging using WebSockets via Socket.IO

    🧾 Private Rooms for secure, room-based conversations

    🧠 File-based JSON Storage for users and room data (no database required)

    🌐 Ngrok Integration to expose localhost for public HTTPS access

    🧅 TOR Hidden Service Deployment (.onion) for anonymous communication

    🐧 Developed and tested in a BlackArch Linux environment

⚙️ Technologies Used
Technology	Purpose
Node.js	Backend runtime
Express.js	HTTP server
Socket.IO	WebSocket communication
Ngrok	Secure public tunnel for local server
TOR	Anonymous .onion hosting
bcrypt	Secure password hashing
JSON	Lightweight, file-based storage

🗂️ Project Structure

├── public/

│   └── index.html     
├── server.js       
├── users.json            
├── package.json

└── README.md             

🛠️ Setup Instructions
1. Clone the Repository

git clone https://github.com/yourusername/secure-chat-app.git
cd secure-chat-app

2. Install Dependencies

npm install

3. Run the App Locally

node server.js

4. Expose via Ngrok (optional)

ngrok http 3000

5. Host as TOR Hidden Service

    Install TOR and configure torrc:

HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServicePort 80 127.0.0.1:3000

    Restart TOR and access your .onion address.

📸 Screenshots
