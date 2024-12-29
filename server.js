const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static('public')); // Serve the chat HTML file

// Path to the messages file
const messagesFile = 'messages.json';

// Read messages from the file
function getMessages() {
    if (fs.existsSync(messagesFile)) {
        return JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
    }
    return [];
}

// Save messages to the file
function saveMessages(messages) {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
}

// Endpoint to get all messages
app.get('/messages', (req, res) => {
    const messages = getMessages();
    res.json(messages);
});

// Endpoint to post a new message
app.post('/messages', (req, res) => {
    const messages = getMessages();
    const newMessage = req.body;
    messages.push(newMessage);
    saveMessages(messages);
    res.status(201).json({ message: 'Message saved!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
