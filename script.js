// Connect to the server using Socket.IO
const socket = io('https://victorious-leeward-search.glitch.me'); // Replace with your Glitch URL

let currentUser = { name: '', age: '', gender: '', interest: '' };
let stranger = { name: 'Stranger', age: 'N/A', gender: 'N/A', interest: 'N/A' };

// Function to simulate random stranger joining based on interests
function startChat() {
    currentUser.name = document.getElementById('name').value;
    currentUser.age = document.getElementById('age').value;
    currentUser.gender = document.getElementById('gender').value;
    currentUser.interest = document.getElementById('interest').value;

    // Emit 'join' event to server with user details
    socket.emit('join', currentUser);

    // Show message while waiting
    displaySystemMessage("Searching for a match...");

    // No need to simulate stranger joining here as the server should handle it
}

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value.trim();

    if (message) {
        // Display the user's message
        displayMessage(`${currentUser.name}: ${message}`, 'user');

        // Emit the message to the server (to send to the matched user)
        socket.emit('message', message);

        // Clear the input field after sending
        messageInput.value = '';
    }
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

// Listen for incoming messages from the server
socket.on('message', (message) => {
    displayMessage(`${stranger.name}: ${message}`, 'stranger');
});

// Listen for a 'match' event when the stranger is found
socket.on('match', (matchedStranger) => {
    // Update stranger details from the server
    stranger = matchedStranger;

    // Notify the user about the match
    displaySystemMessage(`A stranger with your interest in ${stranger.interest} has joined!`);
    displayMessage(`${stranger.name} has joined the chat.`, 'system');
});
