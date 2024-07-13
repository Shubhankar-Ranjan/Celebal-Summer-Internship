const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// File Upload Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    fileFilter: function (req, file, cb) {
        // Allowed ext
        const filetypes = /jpeg|jpg|png/;
        // Check ext
        const extname = filetypes.test(file.originalname.toLowerCase());
        // Check mimetype
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .jpg, .jpeg, .png file types are allowed!'));
        }
    }
});

// Routes
// File Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
}, (error, req, res, next) => {
    // This will catch Multer errors
    if (error instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(500).send({ error: error.message });
    } else if (error) {
        // An unknown error occurred when uploading.
        return res.status(500).send({ error: error.message });
    }

    // If no errors, pass control to the next middleware function
    next();
});

// File upload directory
const uploadsDir = path.join(__dirname, 'uploads');

// Getting the files from the uploads directory
app.get('/files', (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Unable to retrieve files.');
        }
        res.send(files);
    });
});

// Route to get a file by name from the uploads directory
app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(err);
            return res.status(404).send('File not found.');
        }
        // Send the file
        res.sendFile(filePath);
    });
});

// Route to delete a file by name from the uploads directory
app.delete('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err);
            // If the file does not exist, send a 404 response
            if (err.code === 'ENOENT') {
                return res.status(404).send('File not found.');
            }
            // For other errors, send a 500 response
            return res.status(500).send('Error deleting the file.');
        }
        // If the file was deleted successfully, send a success response
        res.send('File deleted successfully.');
    });
});


// Third-Party API Integration Route
// Getting Random Users
app.get('/random-user', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from the API');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});