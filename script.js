const chatBox = document.getElementById("chatBox");

// Trigger send on Enter key
function checkEnter(event) {
    if (event.key === "Enter") sendMessage();
}

// Handle typed messages
function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (text === "") return;

    // Show user message
    chatBox.innerHTML += `<div class="user-message">${text}</div>`;

    // Bot response
    const response = getBotResponse(text);
    chatBox.innerHTML += `<div class="bot-message">${response}</div>`;

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Keyword-based AI
function getBotResponse(text) {
    text = text.toLowerCase();

    if (text.includes("program") || text.includes("course") || text.includes("learn")) {
        return "📚 We offer leadership, technology, and career development programs specially designed for women.";
    }
    if (text.includes("enroll") || text.includes("join") || text.includes("registration")) {
        return "📝 Enrollment is simple! Choose a program, submit your details, and our team will guide you.";
    }
    if (text.includes("career") || text.includes("job") || text.includes("placement")) {
        return "💼 We provide mentorship, placement guidance, and interview preparation.";
    }
    if (text.includes("contact") || text.includes("help") || text.includes("support")) {
        return "📞 You can reach our support team via the website contact form or email.";
    }

    return `🤖 Sorry, I didn't understand that. Please ask about programs, enrollment, career support, or contact.`;
}

// Handle option button clicks
function handleUser(choice) {
    chatBox.innerHTML += `<div class="user-message">You selected: ${choice}</div>`;

    let response = "";
    if (choice === "programs") {
        response = "📚 We offer leadership, technology, and career development programs specially designed for women.";
    } else if (choice === "enroll") {
        response = "📝 Enrollment is simple! Choose a program, submit your details, and our team will guide you.";
    } else if (choice === "career") {
        response = "💼 We provide mentorship, placement guidance, and interview preparation.";
    } else if (choice === "contact") {
        response = "📞 You can reach our support team via the website contact form or email.";
    }

    chatBox.innerHTML += `
        <div class="bot-message">${response}</div>
        <div class="bot-message">
            ❓ Did this help you?
            <br><br>
            <button onclick="feedback('yes')">👍 Yes</button>
            <button onclick="feedback('no')">👎 No</button>
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle feedback
function feedback(answer) {
    if (answer === "yes") {
        chatBox.innerHTML += `<div class="bot-message">😊 Glad to help! Would you like to know anything else?</div>`;
    } else {
        chatBox.innerHTML += `<div class="bot-message">😔 Sorry about that. Please ask another question or contact our support team.</div>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
