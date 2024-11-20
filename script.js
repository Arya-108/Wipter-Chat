let currentUser = { name: '', age: '', gender: '', interest: '' };
let stranger = { name: 'Stranger', age: 'N/A', gender: 'N/A', interest: 'N/A' };

// Function to simulate random stranger joining based on interests
function startChat() {
    currentUser.name = document.getElementById('name').value;
    currentUser.age = document.getElementById('age').value;
    currentUser.gender = document.getElementById('gender').value;
    currentUser.interest = document.getElementById('interest').value;

    // Show message while waiting
    displaySystemMessage("Searching for a match...");

    // Simulate the process of finding a stranger
    setTimeout(() => {
        // Randomly determine the stranger's interest and name
        stranger.interest = getRandomInterest();
        stranger.name = getRandomName();

        // Notify the user that a stranger has joined based on interests
        displaySystemMessage(`A stranger with your interest in ${stranger.interest} has joined!`);
        
        // Display message that the stranger has joined
        displayMessage(`${stranger.name} has joined the chat.`, 'system');
    }, 2000);
}

// Function to get a random interest
function getRandomInterest() {
    const interests = ['Music', 'Movies', 'Travel', 'Food', 'Technology', 'Sports'];
    return interests[Math.floor(Math.random() * interests.length)];
}

// Function to get a random name for the stranger
function getRandomName() {
    const names = ['Alice', 'Bob', 'John', 'Jane', 'Mark', 'Lily'];
    return names[Math.floor(Math.random() * names.length)];
}

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value.trim();

    if (message) {
        // Display the user's message
        displayMessage(`${currentUser.name}: ${message}`, 'user');

        // Simulate the stranger replying after a short delay
        setTimeout(() => {
            displayMessage(`${stranger.name}: Hello, nice to meet you!`, 'stranger');
        }, 1500);
    }

    // Clear the input field after sending
    messageInput.value = '';
}

// Function to display a message in the chat
function displayMessage(message, sender) {
    const messagesContainer = document.getElementById('messages');

    // Create a new message element
    const newMessage = document.createElement('div');
    newMessage.classList.add('message', sender);
    newMessage.innerHTML = message;

    // Append the new message to the container
    messagesContainer.appendChild(newMessage);

    // Scroll to the bottom of the chat window
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to display system messages
function displaySystemMessage(message) {
    const systemMessageElement = document.getElementById('system-msg');
    systemMessageElement.innerText = message;
}



