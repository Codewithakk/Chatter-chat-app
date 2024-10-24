# Chatter - MERN Chat Application


NOTE!!! if you want to use the given website please wait for 1 minute after logging in for the first time for the backend server to get 
## Features

### Dark/Light Mode and Responsive Website
- Users can switch between dark and light themes for better readability and responsive website for dekstop and mobile.


### Authentication
- Users can sign up, log in, and upload profile photos.
- Forgot password functionality is also available with OTP verification.

### Responsive Dashboard
- Different UI of dashboard for desktop and phone.


### New Chat
- Chatting with new users.


### Smooth Searching
- Search chats for easy access.


### Chatting Area & Real-time Communication
- Users can chat with friends or create new chats with anyone on the app.

### New Message Real-time Notification
- Real-time messaging with notifications ensures seamless communication.


### Typing Animation
- Typing animation indicates when another user is typing a message.

### Message Management
- Users can delete messages for themselves or for everyone in the chat.


### Active Now Status
- Users can see the active status of their friends.

### Message Seen Status
- Users can see if their messages have been seen by the recipient.


### Personalized Chatbot
- Each user has a personalized chatbot that remembers previous chat contexts.


### Image Messages
- Users can send images as messages along with captions.

### Login using Otp
- Login using otp if user forgets the password

## Technologies Used

![MongoDB](https://img.shields.io/badge/mongodb-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge)
![React.js](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/socket.io-%23000000.svg?style=for-the-badge&logo=socket.io&logoColor=white)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/mern-chat-app.git
   ```
2. Navigate to the backend folder and frontend folter then install dependencies:
    ```
    cd backend
    npm install
    ```
    
    ```
    cd frontend
    npm install
    ```
    
3. Create a .env file in the backend folder and add necessary environment variables:
    ```
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
1. Start the backend server:
    ```
    cd backend
    nodemon ./index.js
    ```
2. Start the frontend development server:
    ```
    cd frontend
    npm run start
    ```
3. Open your browser and navigate to http://localhost:3000 to view the application.

