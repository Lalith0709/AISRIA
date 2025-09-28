let username = "";
let sessionId = localStorage.getItem("sessionId") || generateSessionId();
localStorage.setItem("sessionId", sessionId);

function startChat() {
	username = document.getElementById("username").value.trim();
	if(username === "") return alert("Enter your name!");
	document.getElementById("namePrompt").style.display = "none";
	document.getElementById("chatContainer").style.display = "block";
	localStorage.setItem("username", username);
	showEditName();
}

function showEditName() {
	let chatContainer = document.getElementById("chatContainer");
	let editBtn = document.getElementById("editNameBtn");
	if (!editBtn) {
		editBtn = document.createElement("button");
		editBtn.id = "editNameBtn";
		editBtn.innerText = "Edit Name";
		editBtn.onclick = editName;
		chatContainer.insertBefore(editBtn, chatContainer.firstChild);
	}
}

function editName() {
	document.getElementById("chatContainer").style.display = "none";
	document.getElementById("namePrompt").style.display = "block";
	document.getElementById("username").value = username;
}

async function sendMessage() {
	const messageInput = document.getElementById("messageInput");
	const message = messageInput.value.trim();
	if (!message) return;

	appendMessage(`You: ${message}`, true);
	messageInput.value = "";

	// Call backend
	const res = await fetch("http://localhost:3000/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, message, sessionId })
	});
	const data = await res.json();
	appendMessage(data.aiResponse, false);
}

function appendMessage(text, isUser) {
	const chatBox = document.getElementById("chatBox");
	const msg = document.createElement("div");
	const time = new Date().toLocaleTimeString();
	msg.innerText = `[${time}] ${text}`;
	msg.className = isUser ? "user-msg" : "ai-msg";
	chatBox.appendChild(msg);
	chatBox.scrollTop = chatBox.scrollHeight;
}

function generateSessionId() {
	return 'sess-' + Math.random().toString(36).substr(2, 9);
}

// Restore username if available
window.onload = function() {
	const savedName = localStorage.getItem("username");
	if (savedName) {
		document.getElementById("username").value = savedName;
	}
}