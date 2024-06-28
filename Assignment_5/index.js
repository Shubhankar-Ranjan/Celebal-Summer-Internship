const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require ("./models/user.model.js");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

// Routes
// Create a new user
app.post('/add', (req, res) => {
    const { name, tech, sub } = req.body;
    userModel.create({ name, tech, sub })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Get all users
app.get('/get', (req, res) => {
    userModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Update a user's details
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, tech, sub } = req.body;
    userModel.findByIdAndUpdate(id, { name, tech, sub }, { new: true }) // {new: true} to return the updated document
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Delete a user
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    userModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});