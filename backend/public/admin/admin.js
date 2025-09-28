
let adminToken = null;

async function adminLogin() {
	const password = document.getElementById("adminPassword").value;
	const res = await fetch("http://localhost:3000/api/admin/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ password })
	});
	const data = await res.json();
	if (data.success) {
		adminToken = data.token;
		document.getElementById("loginSection").style.display = "none";
		document.getElementById("dashboard").style.display = "block";
		loadDashboard();
	} else {
		document.getElementById("loginError").innerText = data.message || "Login failed";
	}
}

async function loadDashboard() {
	// Load users
	const usersRes = await fetch("http://localhost:3000/api/users");
	const users = await usersRes.json();
	document.getElementById("userCount").innerText = users.length;
	const ul = document.getElementById("userList");
	ul.innerHTML = "";
	users.forEach(u => {
		const li = document.createElement("li");
		li.innerText = u;
		ul.appendChild(li);
	});

	// Load messages
	const msgRes = await fetch("http://localhost:3000/api/messages");
	const messages = await msgRes.json();
	document.getElementById("messageCount").innerText = messages.length;

	// Sessions (unique sessionId count)
	const sessionIds = new Set(messages.map(m => m.sessionId).filter(Boolean));
	document.getElementById("sessionCount").innerText = sessionIds.size;

	// Show conversations
	const convoDiv = document.getElementById("convoList");
	convoDiv.innerHTML = "";
	messages.forEach(m => {
		const div = document.createElement("div");
		div.innerText = `[${m.timestamp}] ${m.username} (${m.sessionId || "-"}): ${m.userMessage} | AI: ${m.aiMessage}`;
		convoDiv.appendChild(div);
	});
}