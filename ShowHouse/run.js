const { MongoClient } = require('mongodb');

// Replace <username> and <password> with your MongoDB Atlas credentials
// const uri = 'mongodb+srv://saisharathchandrakoppu23cse:6T4eYZcfUFPoXbwO@cluster0.konhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0mongodb+srv://saisharathchandrakoppu23cse:6T4eYZcfUFPoXbwO@cluster0.konhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const uri = 'mongodb+srv://saisharathchandrakoppu23cse:6T4eYZcfUFPoXbwO@cluster0.konhl.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function insertMovies() {
  try {
    await client.connect(); // Connect to the MongoDB cluster
    const db = client.db('saisharathchandrakoppu23cse'); // Replace 'moviesDB' with your database name if different
    db.createCollection("movies")
    const collection = db.collection('movies'); // Replace 'movies' with your collection name if different

    // Movie data to be inserted
    const movies = [
      {
        title: "Alien",
        image_url: "https://c4.wallpaperflare.com/wallpaper/852/644/1008/alien-movie-poster-sigourney-weaver-movie-poster-wallpaper-preview.jpg",
        booking_link: "/ShowHouse/mix/index.html"
      },
      {
        title: "Inception",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71kGYzkUYUrDwva4CS5aMlV-wAlDBpOkpiEYSA9bG9n8SCDQkCSUfqKNVc29EHxGL_Qs&usqp=CAU",
        booking_link: "/ShowHouse/mix/index.html"
      },
      {
        title: "Blade Runner 2049",
        image_url: "https://rukminim2.flixcart.com/image/850/1000/jf8khow0/poster/a/u/h/small-hollywood-movie-poster-blade-runner-2049-ridley-scott-original-imaf3qvx88xenydd.jpeg?q=90&crop=false",
        booking_link: "/ShowHouse/mix/index.html"
      },
      {
        title: "Abstract Fantasy",
        image_url: "https://img.freepik.com/premium-photo/abstract-fantasy-movie-poster-high-quality-picture-your-work-generative-ai-abstract-fantasy-movie-poster_174191-1337.jpg",
        booking_link: "/ShowHouse/mix/index.html"
      },
      {
        title: "Star Wars: The Rise of Skywalker",
        image_url: "https://c4.wallpaperflare.com/wallpaper/153/860/948/movie-poster-star-wars-star-wars-the-rise-of-skywalker-2019-year-movies-hd-wallpaper-preview.jpg",
        booking_link: "/ShowHouse/mix/index.html"
      },
      {
        title: "Avengers: Endgame",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpiDfbptvAAwVNT8XT5qeUC8Fc7I5z57PFQ&s",
        booking_link: "/ShowHouse/mix/index.html"
      },
      {
        title: "Interstellar",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReuzBzMLGG04TsYmwP5T1YRaxILb-7h_Ckqg&s",
        booking_link: "/ShowHouse/mix/index.html"
      },
      {
        title: "Bulbbul",
        image_url: "https://upload.wikimedia.org/wikipedia/en/4/46/Bulbbul.jpg",
        booking_link: "/ShowHouse/mix/index.html"
      }
    ];

    // Insert movies into the collection
    const result = await collection.insertMany(movies);

    console.log(`${result.insertedCount} movies inserted successfully!`);
  } catch (error) {
    console.error("Error inserting movies:", error);
  } finally {
    await client.close(); // Close the connection to the database
  }
}

// Call the function to insert movies
insertMovies().catch(console.error);
