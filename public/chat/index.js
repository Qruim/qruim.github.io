const socket = new WebSocket("ws://localhost:3001");

socket.onopen = () => {
    const name = sessionStorage.userName;
    const content = "Just join the chat!";
    socket.send(JSON.stringify({ name, content }));
};

socket.onerror = (error) => {
    console.log("WebSocket error: ", error);
};

const chatArea = document.getElementById("chatArea");

socket.onmessage = (event) => {
    const { name, content } = JSON.parse(event.data);

    const messageEl = document.createElement("div");
    messageEl.className = "message_body";
    messageEl.innerHTML = `
        <p class="message__user_name">${name}</p>
        <p class="message__text">${content}</p>
    `;
    chatArea.append(messageEl);
};

socket.onclose = (event) => {
    console.log("WebSocket closed: ", event);
};

const userNameInput = document.getElementById("userNameInput");
const userNameOutput = document.getElementById("userName");
const userInfoSettings = document.getElementById("userInfoSettings");

if (sessionStorage["userName"]) {
    userNameOutput.innerText = `, ${sessionStorage["userName"]}`;
    document.title = sessionStorage["userName"];
}

userInfoSettings.addEventListener("submit", (ev) => {
    ev.preventDefault();

    if (userNameInput.value) {
        sessionStorage["userName"] = userNameInput.value;
    }

    userNameOutput.innerText = `, ${sessionStorage["userName"]}`;
    document.title = sessionStorage["userName"];
});

const messageForm = document.getElementById("messageForm");

messageForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const data = JSON.stringify({ name: sessionStorage.userName, content: ev.target.messageInput.value });
    socket.send(data);
});
