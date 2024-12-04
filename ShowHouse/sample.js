const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb+srv://saisharathchandrakoppu23cse:6T4eYZcfUFPoXbwO@cluster0.konhl.mongodb.net/?retryWrites=true&w=majority"; // Default connection URI

// Connect to MongoDB
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect to the client
        await client.connect();

        // Database and collection
        const db = client.db("MovieBookingDB"); // Database name
        const collection = db.collection("Shows"); // Collection name

        // Generate dummy data
        const movieNames = ["Avengers", "Interstellar", "Inception", "The Dark Knight", "Frozen"];
        const theaters = ["Cinema Hall 1", "Cinema Hall 2", "Cinema Hall 3", "Cinema Hall 4"];
        const times = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];
        const dummyData = [];

        for (let i = 0; i < 10; i++) { // Generate 10 movie show records
            const movie = movieNames[Math.floor(Math.random() * movieNames.length)];
            const theater = theaters[Math.floor(Math.random() * theaters.length)];
            const time = times[Math.floor(Math.random() * times.length)];
            const totalSeats = 100; // Each show has 100 seats
            const reservedSeatsCount = Math.floor(Math.random() * (30 - 10 + 1)) + 10; // Reserve 10-30 seats
            const reservedSeats = Array.from({ length: reservedSeatsCount }, () => 
                Math.floor(Math.random() * totalSeats) + 1
            );
            const uniqueReservedSeats = [...new Set(reservedSeats)]; // Ensure no duplicates

            dummyData.push({
                movie_name: movie,
                theater: theater,
                time: time,
                total_seats: totalSeats,
                reserved_seats: uniqueReservedSeats,
                available_seats: totalSeats - uniqueReservedSeats.length,
            });
        }

        // Insert dummy data into the collection
        await collection.insertMany(dummyData);

        console.log("Database and collection created. Dummy data inserted successfully!");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the client connection
        await client.close();
    }
}

// Run the script
main().catch(console.error);
