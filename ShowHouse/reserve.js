document.addEventListener('DOMContentLoaded', () => {
  const reserveButton = document.getElementById('reserveButton');
  
  reserveButton.addEventListener('click', () => {
      const movieTitle = document.getElementById('movieTitle').value;
      const dateTime = document.getElementById('dateTime').value;
      const selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(seat => seat.id);

      // Send request to reserve seats
      fetch('http://localhost:5000/api/reserve-seats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ movieTitle, dateTime, selectedSeats })
      })
      .then(response => response.json())
      .then(data => {
          console.log('Seats reserved:', data);
      })
      .catch(error => {
          console.error('Error reserving seats:', error);
      });
  });
});
