const express = require('express');
const app = express();

// Middleware: logs the current date and time, the HTTP method, and the request URL
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
});

// Routes: Endpoints
// 1st endpoint
app.get('/', (req, res) => {
    res.send('Home Page');
});

// 2nd endpoint
app.get('/about', (req, res) => {
    res.send('About Page');
});

// Setting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});