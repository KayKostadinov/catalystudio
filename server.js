const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

// connect Mongo
const connectDB = require('./config/db');
connectDB();

// Run server
app.listen(port, () => {
    console.log(`Catalyst Studio server running on port ${port}`)
})