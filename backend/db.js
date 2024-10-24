const mongoose = require("mongoose");
// dotenv.config({ path: "./.env" });
const dotenv = require('dotenv');

dotenv.config({ path: "./.env" });


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "chatapp",
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
