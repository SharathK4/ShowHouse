document.addEventListener('DOMContentLoaded', () => {
    const seatsContainer = document.getElementById('seatsContainer');
    const totalPriceElement = document.getElementById('totalPrice');
    const selectedSeatsDisplay = document.getElementById('selectedSeatsDisplay');
    const buyTicketBtn = document.getElementById('buyTicketBtn');
    const movieTitleElement = document.getElementById('movieTitle');
    const currentDateElement = document.getElementById('currentDate');
    const currentTimeElement = document.getElementById('currentTime');

    const rows = 9;
    const seatsPerRow = 15;
    const seatPrice = 400;
    let selectedSeats = [];

    // Set movie title from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('movieTitle') || 'Select Your Seats';
    movieTitleElement.textContent = decodeURIComponent(movieTitle);

    // Set current date and time
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    });
    currentDateElement.textContent = dateTimeString.split(',')[0];
    currentTimeElement.textContent = dateTimeString.split(',')[1].trim();

    function createSeat(seatId) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = seatId;
        seat.dataset.id = seatId;

        if (['B4', 'B5', 'B6', 'C8'].includes(seatId)) {
            seat.classList.add('reserved');
        } else {
            seat.classList.add('available');
            seat.addEventListener('click', () => toggleSeat(seat));
        }

        return seat;
    }

    function toggleSeat(seat) {
        const seatId = seat.dataset.id;
        if (selectedSeats.includes(seatId)) {
            selectedSeats = selectedSeats.filter(id => id !== seatId);
            seat.classList.remove('selected');
            seat.classList.add('available');
        } else {
            selectedSeats.push(seatId);
            seat.classList.remove('available');
            seat.classList.add('selected');
        }
        updateBookingInfo();
    }

    function updateBookingInfo() {
        const total = selectedSeats.length * seatPrice;
        totalPriceElement.textContent = `₹ ${total.toFixed(2)}`;
        selectedSeatsDisplay.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected';
        buyTicketBtn.disabled = selectedSeats.length === 0;
    }

    // Create seats
    for (let row = 0; row < rows; row++) {
        const rowLabel = String.fromCharCode(65 + row);
        for (let seat = 1; seat <= seatsPerRow; seat++) {
            const seatId = `${rowLabel}${seat}`;
            seatsContainer.appendChild(createSeat(seatId));
        }
    }

    // Buy ticket button click handler
    buyTicketBtn.addEventListener('click', () => {
        const selectedSeatsString = selectedSeats.join(', ');
        const totalPrice = selectedSeats.length * seatPrice;
        window.location.href = `ticket-confirmation.html?movieTitle=${encodeURIComponent(movieTitle)}&dateTime=${encodeURIComponent(dateTimeString)}&seats=${encodeURIComponent(selectedSeatsString)}&totalPrice=${totalPrice}`;
    });
});