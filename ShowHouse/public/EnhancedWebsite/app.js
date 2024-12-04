// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Database Connection
connectDB();

// Templating Engine Setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});