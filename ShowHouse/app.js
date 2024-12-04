const express = require('express');
const path = require('path');
const hbs = require('hbs');



const app = express();

// Set Handlebars as the view engine
app.set('view engine', 'hbs');

// Set the views directory to the correct path
app.set('views', path.join(__dirname, 'views')); // Ensure this points to the correct directory

// Register partials directory if needed (optional, only if you have partials)
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Serve static files (e.g., for CSS, JS, images) from the 'main' folder
app.use('/main', express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    // Render home.hbs with the title variable
    res.render('home', { title: 'Home Page' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
