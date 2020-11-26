const { json } = require('express');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }))

// connect Mongo
const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => {
    res.send('Howdy')
})

app.use('/api/users', require('./routes/api/users'));

// Run server
app.listen(PORT, () => {
    console.log(`Catalyst Studio server running on port ${PORT}`)
})