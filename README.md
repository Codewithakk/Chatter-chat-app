
# Chatter - MERN Chat Application

**NOTE**: For the first-time login, please wait for 1 minute after logging in for the backend server to initialize.

## Features

### Dark/Light Mode & Responsive Design
- Toggle between dark and light themes for a personalized experience.
- The app is fully responsive, optimized for both desktop and mobile devices.

### Authentication
- Users can sign up, log in, and upload profile pictures.
- Forgot password functionality is available with OTP verification for recovery.

### Responsive Dashboard
- Separate dashboard UIs optimized for desktop and mobile devices.

### New Chats
- Chat with new users and make new connections instantly.

### Smooth Searching
- Quickly search for chats and users for easier access.

### Real-time Messaging
- Seamless real-time communication with friends and contacts.

### Real-time Notifications
- Get instant notifications for new messages in real-time.

### Typing Indicators
- Real-time typing animations when the other user is typing a message.

### Message Management
- Ability to delete messages for yourself or for everyone in the chat.

### Active Status
- View the real-time active status of your contacts.

### Message Seen Status
- Know when your message has been seen by the recipient.

### Personalized Chatbot
- Each user gets a personalized chatbot that retains context from previous conversations.

### Image Messaging
- Send images with captions to enhance your chats.

### OTP Login
- Users can log in using an OTP if they forget their password.

## Technologies Used

![MongoDB](https://img.shields.io/badge/mongodb-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge)
![React.js](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/socket.io-%23000000.svg?style=for-the-badge&logo=socket.io&logoColor=white)

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- MongoDB
- Git

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/mern-chat-app.git
   ```

2. **Install dependencies** for both backend and frontend:

   **Backend:**
   ```bash
   cd backend
   npm install
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Setup**: Create a `.env` file in the backend folder and add the following environment variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   EMAIL=your_email@example.com
   PASSWORD=your_email_password
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GENERATIVE_API_KEY=your_generative_api_key
   ```

## Usage

1. **Start the backend server**:
   ```bash
   cd backend
   nodemon ./index.js
   ```

2. **Start the frontend development server**:
   ```bash
   cd frontend
   npm start
   ```

3. **Access the application**: Open your browser and navigate to `http://localhost:3000` to start using Chatter.

---
