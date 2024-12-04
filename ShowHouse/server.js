const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // To load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Schema and Model for seat reservations
const seatSchema = new mongoose.Schema({
    movieTitle: String,
    dateTime: String,
    reservedSeats: [String]
});
const Seat = mongoose.model('Seat', seatSchema);

// API Routes

// 1. Fetch movie data (replace with your actual movie data logic)
app.get('/movies', (req, res) => {
    // This is just a placeholder; replace with actual data fetching
    const movies = [
        { title: 'Movie 1', image_url: 'image1.jpg', booking_link: '/book/1' },
        { title: 'Movie 2', image_url: 'image2.jpg', booking_link: '/book/2' }
    ];
    res.json({ movies });
});

// 2. Fetch reserved seats
app.get('/api/reserved-seats', async (req, res) => {
    const { movieTitle, dateTime } = req.query;
    try {
        const seatData = await Seat.findOne({ movieTitle, dateTime });
        res.json(seatData ? seatData.reservedSeats : []);
    } catch (error) {
        console.error('Error fetching reserved seats:', error);
        res.status(500).json({ error: 'Failed to fetch reserved seats' });
    }
});

// 3. Reserve seats
app.post('/api/reserve-seats', async (req, res) => {
    const { movieTitle, dateTime, selectedSeats } = req.body;
    try {
        let seatData = await Seat.findOne({ movieTitle, dateTime });
        if (!seatData) {
            seatData = new Seat({ movieTitle, dateTime, reservedSeats: selectedSeats });
        } else {
            seatData.reservedSeats = [...new Set([...seatData.reservedSeats, ...selectedSeats])];
        }
        await seatData.save();
        res.json({ success: true, reservedSeats: seatData.reservedSeats });
    } catch (error) {
        console.error('Error reserving seats:', error);
        res.status(500).json({ error: 'Failed to reserve seats' });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
