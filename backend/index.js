const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initDB, addMessage, getMessages, getUsers } = require("./db");
const crypto = require("crypto");

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
// Serve static files for frontend and admin
app.use(express.static(path.join(__dirname, "public")));

initDB();

// Chat endpoint
app.post("/api/chat", async (req, res) => {
    const { username, message, sessionId } = req.body;
    // Simple AI placeholder
    const aiResponse = `Sria: I hear you, ${username}. You said \"${message}\"`;
    // Store in DB with sessionId
    await addMessage(username, message, aiResponse, sessionId);
    res.json({ aiResponse });
});

// Get messages for admin
app.get("/api/messages", async (req, res) => {
    const messages = await getMessages();
    res.json(messages);
});

// Get users for admin
app.get("/api/users", async (req, res) => {
    const users = await getUsers();
    res.json(users);
});

// Admin login (simple password, for MVP)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lsjlu07210912";
app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        // Generate a simple session token
        const token = crypto.randomBytes(16).toString("hex");
        // In production, store token in DB or memory
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
});

app.listen(PORT, () => {
    console.log(`Sria backend running on http://localhost:${PORT}`);
});