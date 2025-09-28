const sqlite3 = require("sqlite3").verbose();
let db;

function initDB() {
    db = new sqlite3.Database("./users.db");
    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        userMessage TEXT,
        aiMessage TEXT,
        sessionId TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

function addMessage(username, userMessage, aiMessage, sessionId) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO messages (username, userMessage, aiMessage, sessionId) VALUES (?, ?, ?, ?)",
            [username, userMessage, aiMessage, sessionId],
            function (err) {
                if (err) reject(err);
                else resolve();
            }
        );
    });
}

function getMessages(callback) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM messages ORDER BY timestamp DESC", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function getMessagesSync() {
    return await getMessages();
}

function getUsers(callback) {
    return new Promise((resolve, reject) => {
        db.all("SELECT DISTINCT username FROM messages", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(r => r.username));
        });
    });
}

async function getUsersSync() {
    return await getUsers();
}

module.exports = {
    initDB,
    addMessage,
    getMessages: getMessagesSync,
    getUsers: getUsersSync,
};