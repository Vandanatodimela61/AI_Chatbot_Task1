const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

let step = 1; // 1: Name, 2: Qualification, 3: Options
let userName = "";
let greeted = false;

// Enter key
function checkEnter(event) {
    if (event.key === "Enter") sendMessage();
}

// Send message
function sendMessage() {
    let text = userInput.value.trim();
    if (text === "") return;

    chatBox.innerHTML += `<div class="user-message">${text}</div>`;
    userInput.value = "";

    if (step === 1 && !greeted) {
        userName = extractName(text);
        chatBox.innerHTML += `<div class="bot-message">Hello ${userName}! Nice to meet you. 😊<br>What is your qualification?</div>`;
        step = 2;
        greeted = true;
    } else if (step === 2) {
        chatBox.innerHTML += `<div class="bot-message">
            Great! 👍<br>
            At <b>Iron Lady</b>, we provide programs and career support for women.
        </div>`;
        showOptionsDiv();
        step = 3;
    } else if (step === 3) {
        handleUserText(text.toLowerCase());
    }

    scrollChatToBottom();
}

// Extract name
function extractName(text) {
    if (text.toLowerCase().includes("my name is")) {
        return capitalize(text.split("my name is")[1].trim());
    }
    return capitalize(text);
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Initialize options
function initOptions() {
    if (!document.getElementById("optionButtons")) {
        chatBox.innerHTML += `
            <div class="options" id="optionButtons" style="display:none;">
                <button onclick="handleUser('programs')">📚 Programs</button>
                <button onclick="handleUser('enroll')">📝 Enrollment</button>
                <button onclick="handleUser('career')">💼 Career Support</button>
                <button onclick="handleUser('contact')">📞 Contact</button>
            </div>
        `;
    }
}

// Show options
function showOptionsDiv() {
    initOptions();
    document.getElementById("optionButtons").style.display = "block";
}

// Hide options
function hideOptionsDiv() {
    const optionDiv = document.getElementById("optionButtons");
    if (optionDiv) optionDiv.style.display = "none";
}

// Handle option buttons
function handleUser(choice) {
    removeOptionResponses();
    hideOptionsDiv();

    let response = "";
    if (choice === "programs") response = "📚 We offer leadership, technology, and career programs for women.";
    else if (choice === "enroll") response = "📝 Choose a program first, then enroll. Thanks for asking, keep in touch!";
    else if (choice === "career") response = "💼 Mentorship, interview prep, and placement guidance.";
    else if (choice === "contact") response = "📞 Contact us anytime via website or email.";

    chatBox.innerHTML += `
        <div class="bot-message option-response">${response}</div>
        <div class="bot-message option-response">
            ❓ Are you satisfied?
            <br><br>
            <button onclick="feedback('${choice}','yes')">👍 Yes</button>
            <button onclick="feedback('${choice}','no')">👎 No</button>
            <button onclick="goBack()" class="back-button">↩️ Back</button>
        </div>
    `;

    scrollChatToBottom();
}

// Handle free-typed text
function handleUserText(text) {
    if (text.includes("enroll")) {
        chatBox.innerHTML += `<div class="bot-message option-response">📝 Please choose a program first, then enroll. Thanks for asking!</div>`;
    } else if (text.includes("program")) {
        chatBox.innerHTML += `<div class="bot-message option-response">📚 We offer leadership, technology, and career programs for women.</div>`;
    } else {
        chatBox.innerHTML += `<div class="bot-message option-response">🤖 Sorry, I can help with Programs, Enrollment, Career, or Contact.</div>`;
    }
    scrollChatToBottom();
}

// Remove previous option responses
function removeOptionResponses() {
    const divs = chatBox.querySelectorAll(".option-response");
    divs.forEach(d => d.remove());
}

// Feedback handling
function feedback(choice, answer) {
    removeOptionResponses();
    if (answer === "yes") {
        if (choice === "contact") chatBox.innerHTML += `<div class="bot-message option-response">🙏 Thanks for visiting! You can approach us anytime.</div>`;
        else chatBox.innerHTML += `<div class="bot-message option-response">😊 Glad to help! You can choose another option above.</div>`;
    } else {
        chatBox.innerHTML += `<div class="bot-message option-response">😔 We will come back with a better answer. Thanks for visiting!</div>`;
    }
    showOptionsDiv();
    scrollChatToBottom();
}

// Back button
function goBack() {
    removeOptionResponses();
    showOptionsDiv();
    scrollChatToBottom();
}

// Scroll to bottom
function scrollChatToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}
