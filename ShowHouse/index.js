const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Replace this with your MongoDB connection string
const uri = 'mongodb+srv://saisharathchandrakoppu23cse:6T4eYZcfUFPoXbwO@cluster0.konhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function fetchMovies() {
    await client.connect();
    const db = client.db('saisharathchandrakoppu23cse');
    const collection = db.collection('movies');
    return await collection.find().toArray();
}

app.use(cors()); // Enable CORS to allow cross-origin requests

app.get('/movies', async (req, res) => {
    try {
        const movies = await fetchMovies();
        res.json({ movies });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
