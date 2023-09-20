const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000; // Change this to your desired port

// Set up multer storage and specify where to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename files with a timestamp
  },
});

const upload = multer({ storage: storage });


// Handle the file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file information from req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Process the uploaded file here (e.g., save it to a database or perform other operations)

  res.status(200).send('File uploaded successfully.');
});


