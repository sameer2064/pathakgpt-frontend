// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  document.body.classList.toggle("dark-theme");
  toggleBtn.textContent = document.body.classList.contains("light-theme") ? "Switch to Dark" : "Switch to Light";
});

// Chat
async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const typingIndicator = document.getElementById("typing-indicator");
  const userText = input.value.trim();
  if (!userText) return;

  chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${userText}</div>`;
  input.value = "";

  typingIndicator.style.display = "block";

  const res = await fetch("https://pathakgpt-gemini.onrender.com/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await res.json();

  typingIndicator.style.display = "none";
  chatBox.innerHTML += `<div class="message bot"><strong>PathakGPT:</strong> ${data.text}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter key sends message
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.getElementById("user-input")) {
    sendMessage();
  }
});
