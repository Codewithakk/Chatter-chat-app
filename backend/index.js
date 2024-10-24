const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");  // Import dotenv
const PORT = process.env.PORT || 5000;  // Use PORT from environment variables or default to 5000

const app = express();

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// CORS configuration
const allowedOrigins = ['https://chatters-chat-app.netlify.app', 'http://localhost:3000']; // Add your allowed origin here
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware
app.use(express.urlencoded({ extended: true, limit: "50mb" }));  // Parse URL-encoded bodies
app.use(express.json({ limit: "50mb" }));  // Parse JSON bodies

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", require("./Routes/auth_routes.js"));  // User authentication routes
app.use("/message", require("./Routes/message_routes.js"));  // Message handling routes
app.use("/conversation", require("./Routes/conversation_routes.js"));  // Conversation handling routes

// Server setup
const server = http.createServer(app);

// Socket.io setup
require("./socket.js")(server);  // Initialize socket.io logic

// Start server and connect to the database
server.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
  connectDB();  // Connect to the MongoDB database
});
