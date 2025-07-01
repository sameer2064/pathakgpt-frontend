async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  // Call your backend
  try {
    const res = await fetch("https://pathakgpt-gemini.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    appendMessage("bot", data.response || "No response");
  } catch (err) {
    appendMessage("bot", "Error connecting to server");
  }
}

function appendMessage(sender, text) {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");
  div.textContent = (sender === "user" ? "You: " : "Bot: ") + text;
  div.style.margin = "5px 0";
  div.style.color = sender === "user" ? "#a855f7" : "#06b6d4";
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
