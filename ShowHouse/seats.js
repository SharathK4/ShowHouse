const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://saisharathchandrakoppu23cse:6T4eYZcfUFPoXbwO@cluster0.konhl.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const SeatSchema = new  mongoose.Schema({
    seats: Object, 
    tempReserved: Object, 
});

const Seat = mongoose.model("Seat", SeatSchema);

const app = express();
app.use(bodyParser.json());

// Fetch reserved and temporarily reserved seats
app.get("/api/reserved-seats", async (req, res) => {
    try {
        const seatData = await Seat.findOne();
        if (seatData) {
            const reservedSeats = Object.keys(seatData.seats).filter((seat) => seatData.seats[seat] === 0);
            const tempReservedSeats = Object.keys(seatData.tempReserved);
            res.json({ reservedSeats, tempReservedSeats });
        } else {
            res.status(404).json({ error: "Seats data not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Temporarily reserve selected seats
app.post("/api/temp-reserve-seats", async (req, res) => {
    const { selectedSeats } = req.body;

    try {
        let seatData = await Seat.findOne();
        if (!seatData) {
            // Initialize seat data if not already present
            seatData = new Seat({ seats: {}, tempReserved: {} });
            for (let i = 65; i <= 73; i++) { // Rows A-I (ASCII 65-73)
                for (let j = 1; j <= 15; j++) { // Seats 1-15
                    const seatId = `${String.fromCharCode(i)}${j}`;
                    seatData.seats[seatId] = 1; // 1 means available, 0 means reserved
                }
            }
        }

        const now = new Date();
        const expiryTime = new Date(now.getTime() + 10 * 60000); // 10 minutes from now

        selectedSeats.forEach((seat) => {
            if (seatData.seats[seat] === 1 && !seatData.tempReserved[seat]) {
                seatData.tempReserved[seat] = { expiry: expiryTime };
            }
        });

        await seatData.save();
        res.status(200).json({ message: "Seats temporarily reserved successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Confirm reservation of selected seats
app.post("/api/confirm-seats", async (req, res) => {
    const { selectedSeats } = req.body;

    try {
        let seatData = await Seat.findOne();
        if (!seatData) {
            return res.status(404).json({ error: "Seats data not found" });
        }

        selectedSeats.forEach((seat) => {
            if (seatData.tempReserved[seat]) {
                seatData.seats[seat] = 0; // Mark as reserved
                delete seatData.tempReserved[seat];
            }
        });

        await seatData.save();
        res.status(200).json({ message: "Seats confirmed successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

