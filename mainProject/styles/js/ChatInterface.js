const API_KEY = localStorage.getItem('apiKey');

// Redirect to settings if API key is missing
if (!API_KEY) window.location.href = 'Settings.html';

// Get the current HTML filename dynamically
const currentPage = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase();

// Define category-based AI messages
const categoryMessages = {
    'risk': "Welcome to the Risk Management section. I can help with risk assessment, mitigation strategies, and compliance.",
    'strategy': "Welcome to Strategic Planning. I can provide insights into data-driven strategies, market expansion, and goal setting.",
    'compliance': "This is the Regulatory Compliance section. I can assist with audits, regulatory updates, and compliance management.",
    'team': "This is the Team Leadership section. Need advice on team management, collaboration, or performance improvement?",
    'data': "You're in the Data-Driven Decisions section. I can help analyze trends, predict outcomes, and make informed decisions.",
    'audit': "This is the Auditing section. I can assist with audit trails, financial reviews, and compliance checks.",
    'settings': "Welcome to the Settings page. Here, you can configure API keys, models, and system preferences.",
    'index': "Welcome to RiskSense AI. I can assist with risk management, strategy, compliance, and more!"
};

// Initialize AI message based on category
const welcomeMessage = categoryMessages[currentPage] || "Hello! How can I assist you with risk management, strategy, or compliance today?";

// Function to send a message
async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message) {
        addMessage(message, true);
        userInput.value = '';

        try {
            const botResponse = await bot.processInput(message);
            setTimeout(() => addMessage(botResponse), 1000);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            addMessage("Sorry, I'm having trouble processing your request right now.");
        }
    }
}

// Function to close the chat
function closeChat() {
    document.getElementById('chat-widget').style.display = 'none';
}

// Handle 'Enter' key event for sending messages
document.getElementById('user-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Function to add a message to the chat
function addMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Popup Modal Handling
const togglePopup = (show = true) => document.getElementById('apiKeyPopup').style.display = show ? 'flex' : 'none';

// Show popup if no API key is found
if (!API_KEY) togglePopup();

// Chat widget toggle
function toggleChat() {
    if (!API_KEY) return togglePopup();
    const chatWidget = document.getElementById('chat-widget');
    chatWidget.style.display = chatWidget.style.display === 'none' ? 'block' : 'none';
}

// AI Bot Class with Context Awareness
class AIBot {
    constructor() {
        this.context = [];
    }

    async processInput(input) {
        const lowerInput = input.toLowerCase();
        this.context.push({ role: 'user', content: input });

        // AI-Powered API Call
        const aiAPI = new OpenAIAPI(API_KEY);
        try {
            return await aiAPI.sendMessage(`${categoryMessages[currentPage]} ${input}`);
        } catch (error) {
            console.error("AI API Error:", error);
            return "I'm unable to process your request right now. Try again later.";
        }
    }
}

// Initialize bot instance
const bot = new AIBot();

// API interface for OpenAI
const settingModel = localStorage.getItem('model') || 'gpt-3.5-turbo';

const modelOptions = {
    'gpt4': 'GPT-4',
    'gpt35': 'GPT-3.5',
    'claude': 'Claude'
};

class OpenAIAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openai.com/v1';
    }

    async sendMessage(message) {
        const selectedModel = localStorage.getItem('model') || settingModel;

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [{ role: 'user', content: message }]
            })
        });

        if (!response.ok) throw new Error('Failed to fetch response from OpenAI');

        const data = await response.json();
        return data.choices[0].message.content;
    }
}

// Display initial category-based message
setTimeout(() => addMessage(welcomeMessage), 1000);

const CHAT_HISTORY_KEY = `chat_history_${window.location.pathname}`; // Unique key per page

// Function to send a message
async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message) {
        addMessage(message, true);
        userInput.value = '';

        try {
            const botResponse = await bot.processInput(message);
            setTimeout(() => addMessage(botResponse), 1000);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            addMessage("I'm having trouble processing your request.");
        }
    }
}

// Function to add messages to the chat
function addMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Save the message to history
    saveChatHistory(message, isUser);
}

// Function to save chat history
function saveChatHistory(message, isUser) {
    let history = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];
    history.push({ message, isUser });
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
}

// Function to load chat history
function loadChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    let history = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];

    history.forEach(({ message, isUser }) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(messageDiv);
    });
}

// Function to clear chat history
function clearChatHistory() {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    document.getElementById('chat-messages').innerHTML = ''; // Remove messages from UI
}

// Load chat history when chat widget opens
document.addEventListener("DOMContentLoaded", loadChatHistory);

