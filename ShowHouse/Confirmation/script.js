document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('movieTitle') || 'Movie Title';
    const selectedSeats = urlParams.get('seats') || '';
    const dateTime = urlParams.get('dateTime') || new Date().toLocaleString();

    document.getElementById('movieTitle').textContent = decodeURIComponent(movieTitle);
    document.getElementById('dateTime').textContent = decodeURIComponent(dateTime);
    document.getElementById('seats').textContent = decodeURIComponent(selectedSeats);

    // Generate QR code
    const qr = qrcode(0, 'M');
    qr.addData(`Movie: ${movieTitle}\nDate/Time: ${dateTime}\nSeats: ${selectedSeats}`);
    qr.make();
    document.getElementById('qrCode').innerHTML = qr.createImgTag(4);
});