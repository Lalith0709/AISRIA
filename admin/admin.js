async function loadUsers() {
    const res = await fetch("http://localhost:3000/api/users");
    const users = await res.json();
    const ul = document.getElementById("userList");
    ul.innerHTML = "";
    users.forEach(u => {
        const li = document.createElement("li");
        li.innerText = u;
        ul.appendChild(li);
    });
}

async function loadMessages() {
    const res = await fetch("http://localhost:3000/api/messages");
    const messages = await res.json();
    const ul = document.getElementById("messageList");
    ul.innerHTML = "";
    messages.forEach(m => {
        const li = document.createElement("li");
        li.innerText = `[${m.timestamp}] ${m.username}: ${m.userMessage} | AI: ${m.aiMessage}`;
        ul.appendChild(li);
    });
}