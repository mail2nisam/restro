const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
const {generate} = require('./generate');

const port = 3001; // You can change the port as needed
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});
app.get('/', (req, res) => {
  res.send('Hello, Express!'); // Send plain text response
});
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Set up a route to handle file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // Log the uploaded file
  console.log('Received file:', req.file);

  // You can process or save the file as needed here
  // For example, if you want to save it to the filesystem:
  const fileBuffer = req.file.buffer;
  const filePath = path.join(__dirname, '/', req.file.originalname);
  fs.writeFileSync(filePath, fileBuffer);
  generate();
  res.status(200).json({ message: 'File uploaded successfully.' });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});