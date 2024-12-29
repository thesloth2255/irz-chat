const express = require('express');
const fs = require('fs');
const path = require('path'); // Required for resolving file paths
const app = express();

const PORT = process.env.PORT || 3000; // Use Render's PORT or default to 3000

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static('public')); // Serve files from the 'public' folder

// Root route to serve chat.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// API endpoint to get all messages
app.get('/messages', (req, res) => {
    const messagesFile = 'messages.json';
    if (fs.existsSync(messagesFile)) {
        const messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
        res.json(messages);
    } else {
        res.json([]);
    }
});

// API endpoint to save a new message
app.post('/messages', (req, res) => {
    const messagesFile = 'messages.json';
    const messages = fs.existsSync(messagesFile)
        ? JSON.parse(fs.readFileSync(messagesFile, 'utf-8'))
        : [];
    const newMessage = req.body;
    messages.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    res.status(201).json({ message: 'Message saved!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});