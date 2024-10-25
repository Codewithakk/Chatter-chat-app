const User = require("../Models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Conversation = require("../Models/Conversation.js");
const ObjectId = require("mongoose").Types.ObjectId;
const cloudinary = require("cloudinary").v2;
const imageupload = require("../config/imageupload.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_SECRET= 'HAPPYAWAYSKHUSH'
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_ClOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const register = async (req, res) => {
  try {
    console.log("register request received");

    const { name, email, password, phoneNum } = req.body;
    if (!name || !email || !password || !phoneNum) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }

    const user = await User.findOne({
      email: email,
    });

    if (user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    var imageUrl = "";

    if (req.file != null) {
      imageUrl = await imageupload(req.file);
    } else {
      imageUrl = `https://ui-avatars.com/api/?name=${name}&background=random&bold=true`;
    }

    // on render doesnt allow to store images locally hence

    // imageUrl = `https://ui-avatar.com/api/?name=${name}&background=random&bold=true`;

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: secPass,
      phoneNum,
      profilePic: imageUrl,
    });

    await newUser.save();

    const us = await User.findOne({ email: email });
    var id = us._id.toString().substring(0, 21) + "/ch";

    id = Buffer.from(id, "utf8").toString("hex");

    us._id = new ObjectId();
    us.name = "AI Chatbot";
    us.email = email + "bot";
    us.phoneNum = "0000000000";
    us.profilePic =
      "https://play-lh.googleusercontent.com/Oe0NgYQ63TGGEr7ViA2fGA-yAB7w2zhMofDBR3opTGVvsCFibD8pecWUjHBF_VnVKNdJ";

    await User.insertMany(us);

    const bot = await User.findOne({ email: email + "bot" });

    const newConversation = new Conversation({
      members: [newUser._id, bot._id],
    });

    await newConversation.save();

    const data = {
      user: {
        id: newUser.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({
      authtoken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  console.log("login request received");

  try {
    const { email, password, otp } = req.body;

    if (!email || (!password && !otp)) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }
    console.log("hii");
    if (otp) {
      if (user.otp != otp) {
        return res.status(400).json({
          error: "Invalid otp",
        });
      }
      user.otp = "";
      await user.save();
    } else {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          error: "Invalid Credentials",
        });
      }
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({
      authtoken,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        phoneNum: user.phoneNum,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const authUser = async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("Please authenticate using a valid token");
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);

    if (!data) {
      return res.status(401).send("Please authenticate using a valid token");
    }

    const user = await User.findById(data.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const allUser = async (req, res) => {
  const requser = req.user;

  try {
    const users = await User.find().select("-password");
    //filter users such bot for other users are not included
    users.forEach((user) => {
      if (user.email.includes("bot") && user.email != requser.email) {
        users.splice(users.indexOf(user), 1);
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updateprofile = async (req, res) => {
  try {
    const dbuser = await User.findById(req.user.id);

    if (req.body.newpassword) {
      const passwordCompare = await bcrypt.compare(
        req.body.oldpassword,
        dbuser.password
      );
      if (!passwordCompare) {
        return res.status(400).json({
          error: "Invalid Credentials",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.newpassword, salt);
      req.body.password = secPass;

      delete req.body.oldpassword;
      delete req.body.newpassword;
    }
    await User.findByIdAndUpdate(req.user.id, req.body);
    res.status(200).json({ message: "Profile Updated" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const sendotp = async (req, res) => {
  try {
    console.log("sendotp request received");
    const { email } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();

    //delete otp after 5 minutes
    setTimeout(() => {
      user.otp = "";
      user.save();
    }, 300000);

    let mailDetails = {
      from: `${process.env.COMPANY_NAME} <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "Login with your OTP - Chatter Chat App",
      
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Chatter
           OTP for Login</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f0f2f5;
                  color: #333;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
              }
              .container {
                  max-width: 500px;
                  width: 90%;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  text-align: center;
                  padding: 20px;
                  animation: fadeIn 1.5s ease;
              }
              h1 {
                  color: #4a90e2;
                  font-size: 24px;
                  margin-bottom: 10px;
                  animation: slideIn 1.2s ease forwards;
              }
              h2 {
                  font-size: 20px;
                  color: #333;
                  animation: slideIn 1.2s ease forwards;
              }
              p {
                  font-size: 16px;
                  color: #555;
                  margin: 15px 0;
              }
              .otp {
                  font-size: 24px;
                  font-weight: bold;
                  color: #4a90e2;
                  letter-spacing: 2px;
                  animation: pulse 1.5s infinite;
              }
              @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
              }
              @keyframes slideIn {
                  from { transform: translateY(-10px); opacity: 0; }
                  to { transform: translateY(0); opacity: 1; }
              }
              @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.5; }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to Chatter!</h1>
              <h2>Your OTP is</h2>
              <p class="otp">${otp}</p>
              <p>Use this OTP to securely login and start chatting with friends and colleagues in real time!</p>
              <p>If you didn't request this OTP, feel free to ignore this message.</p>
          </div>
      </body>
      </html>`
    };
    

    await mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
        res.status(400).json({ message: "Error Occurs" });
      } else {
        console.log("Email sent successfully");
        res.status(200).json({ message: "OTP sent" });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};


// Block a user
const blockUser = async (req, res) => {
  try {
    const userId = req.user.id; // ID of the user who wants to block someone
    const blockedUserId = req.params.userId; // ID of the user to block

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Add the user to the blockedUsers array if not already blocked
    if (!user.blockedUsers.includes(blockedUserId)) {
      user.blockedUsers.push(blockedUserId);
      await user.save();
    }

    res.status(200).json({ message: "User blocked successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Unblock a user
const unblockUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const blockedUserId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Remove the user from the blockedUsers array if present
    user.blockedUsers = user.blockedUsers.filter(id => id.toString() !== blockedUserId);
    await user.save();

    res.status(200).json({ message: "User unblocked successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Check if a user is blocked
const checkIfBlocked = async (req, res) => {
  try {
    const userId = req.user.id;
    const checkUserId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isBlocked = user.blockedUsers.includes(checkUserId);
    res.status(200).json({ isBlocked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  register,
  login,
  allUser,
  authUser,
  updateprofile,
  sendotp,
  blockUser, unblockUser, checkIfBlocked
};
