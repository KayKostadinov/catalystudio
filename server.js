const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// connect Mongo
const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => {
    res.send('Howdy')
})

// Run server
app.listen(PORT, () => {
    console.log(`Catalyst Studio server running on port ${PORT}`)
})