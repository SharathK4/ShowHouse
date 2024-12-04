document.addEventListener('DOMContentLoaded', () => {
    // Fetch the movie data from the server API
    fetch('http://localhost:5000/movies') // Ensure the server is running on port 5000
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const movieGrid = document.getElementById('movieGrid');
            data.movies.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.classList.add('movie-item');
                
                movieItem.innerHTML = `
                    <img class="movie-placeholder" src="${movie.image_url}" alt="${movie.title}">
                    <a href="${movie.booking_link}"><button class="book-now">Book Now</button></a>
                `;
                
                movieGrid.appendChild(movieItem);
            });
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });
});
