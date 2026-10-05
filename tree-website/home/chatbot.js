
/* ============================================================
   Arveli Assistant — chatbot frontend
   Connects to an n8n webhook.
   ============================================================ */

const N8N_WEBHOOK_URL =
  "https://pennant-shadily-antiquely.ngrok-free.dev/webhook/website-chatbot";

const WELCOME_MESSAGE =
  "Hi! I'm Arveli Assistant 🌿 I can help you find plants, understand plant care, or learn more about our seeds, pots, tools, and soil.";

const FALLBACK_MESSAGE =
  "Sorry, I couldn't quite get that. Could you try asking again in a moment?";

(() => {
  const root = document.querySelector(".arveli-chatbot");
  if (!root) return;

  const toggleBtn = document.getElementById("chatbot-toggle");
  const closeBtn = document.getElementById("chatbot-close");
  const panel = document.getElementById("chatbot-panel");
  const messagesEl = document.getElementById("chatbot-messages");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");

  let hasOpenedBefore = false;
  let isWaitingForResponse = false;

  // ---- Panel open/close ----------------------------------------------

  function openPanel() {
    root.classList.add("is-open");
    toggleBtn.setAttribute("aria-expanded", "true");

    if (!hasOpenedBefore) {
      hasOpenedBefore = true;
      addMessage(WELCOME_MESSAGE, "bot");
    }

    setTimeout(() => input.focus(), 200);
  }

  function closePanel() {
    root.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.focus();
  }

  toggleBtn.addEventListener("click", openPanel);

  closeBtn.addEventListener("click", closePanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("is-open")) {
      closePanel();
    }
  });

  // ---- Message rendering ----------------------------------------------

  function addMessage(text, sender) {
    const bubble = document.createElement("div");

    bubble.className =
      `chatbot-message chatbot-message--${sender}`;

    bubble.textContent = text;

    messagesEl.appendChild(bubble);

    scrollToBottom();
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // ---- Send state -------------------------------------------------------

  function updateSendState() {
    sendBtn.disabled =
      input.value.trim().length === 0 || isWaitingForResponse;
  }

  input.addEventListener("input", updateSendState);

  updateSendState();

  // ---- Submit handling --------------------------------------------------

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();

    if (!text || isWaitingForResponse) return;

    addMessage(text, "user");

    input.value = "";

    updateSendState();

    sendToN8n(text);
  });

  // ---- Send message to n8n ---------------------------------------------

  async function sendToN8n(message) {
    console.log("Sending to n8n:", message);
    console.log("Webhook URL:", N8N_WEBHOOK_URL);

    isWaitingForResponse = true;

    updateSendState();

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: message,
          source: "arveli-website"
        }),
      });

      console.log("n8n response status:", res.status);

      if (!res.ok) {
        throw new Error(
          `Webhook returned status ${res.status}`
        );
      }

      const data = await res.json();

      console.log("n8n response:", data);

      const reply = extractReply(data);

      addMessage(
        reply || FALLBACK_MESSAGE,
        "bot"
      );

    } catch (err) {
     
      addMessage(
        "I'm having trouble connecting right now. Please try again shortly.",
        "error"
      );

    } finally {
      isWaitingForResponse = false;

      updateSendState();
    }
  }

  // ---- Extract answer from n8n response -------------------------------

  function extractReply(data) {
    const payload =
      Array.isArray(data) ? data[0] : data;

    if (!payload) return null;

    if (typeof payload === "string") {
      return payload;
    }

    return (
      payload.answer ||
      null
    );
  }

})();
