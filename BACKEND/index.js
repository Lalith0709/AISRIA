const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initDB, addMessage, getMessages, getUsers } = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

initDB();

// Chat endpoint
app.post("/api/chat", (req, res) => {
    const { username, message } = req.body;

    // Simple AI placeholder
    const aiResponse = `Sria: I hear you, ${username}. You said "${message}"`;

    // Store in DB
    addMessage(username, message, aiResponse);

    res.json({ aiResponse });
});

// Get messages for admin
app.get("/api/messages", (req, res) => {
    const messages = getMessages();
    res.json(messages);
});

// Get users for admin
app.get("/api/users", (req, res) => {
    const users = getUsers();
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Sria backend running on http://localhost:${PORT}`);
});