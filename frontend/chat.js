let username = "";

function startChat() {
    username = document.getElementById("username").value.trim();
    if(username === "") return alert("Enter your name!");
    document.getElementById("namePrompt").style.display = "none";
    document.getElementById("chatContainer").style.display = "block";
}

async function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();
    if (!message) return;

    appendMessage(`You: ${message}`);
    messageInput.value = "";

    // Call backend
    const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, message })
    });
    const data = await res.json();
    appendMessage(data.aiResponse);
}

function appendMessage(text) {
    const chatBox = document.getElementById("chatBox");
    const msg = document.createElement("div");
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}