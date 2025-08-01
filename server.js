
// server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API ENDPOINT ---
// This endpoint simulates an AI response
app.post('/ask', (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required.' });
    }

    // Simulate AI processing delay
    setTimeout(() => {
        const aiResponse = `This is a simulated AI response to your query about "${query}". The universe is vast and full of wonders, and your question adds to its beautiful complexity. According to my calculations, the answer is likely 42.`;

        res.json({ answer: aiResponse });
    }, 1500); // 1.5 second delay
});

// --- STATIC FILE SERVING ---
// Serve the static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to serve index.html for any other request (for single-page app routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});