document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('movieCarousel');
    const posters = Array.from(carousel.getElementsByClassName('poster'));
    let centerIndex = 0;

    function positionPosters() {
        const radius = 500;
        const totalPosters = posters.length;
        const angleStep = (2 * Math.PI) / totalPosters;

        posters.forEach((poster, index) => {
            const angle = angleStep * ((index - centerIndex + totalPosters) % totalPosters);
            const x = Math.sin(angle) * radius;
            const y = -Math.cos(angle) * (radius / 3);
            const scale = (Math.cos(angle) + 1) / 2 * 0.5 + 0.5;
            const zIndex = Math.round(scale * 100);

            poster.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
            poster.style.zIndex = zIndex;
            poster.style.opacity = scale;
        });
    }

    function rotatePoster() {
        centerIndex = (centerIndex + 1) % posters.length;
        positionPosters();
    }

    positionPosters();

    setInterval(rotatePoster, 3000);

    posters.forEach((poster, index) => {
        poster.addEventListener('click', () => {
            centerIndex = index;
            positionPosters();
        });
    });

    // Filter buttons animation
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active', 'bounce'));
            button.classList.add('active', 'bounce');
            setTimeout(() => button.classList.remove('bounce'), 500);
        });
    });

    // Search and Location overlays
    const searchIcon = document.getElementById('searchIcon');
    const locationIcon = document.getElementById('locationIcon');
    const searchOverlay = document.getElementById('searchOverlay');
    const locationOverlay = document.getElementById('locationOverlay');

    function toggleOverlay(overlay) {
        overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
    }

    searchIcon.addEventListener('click', () => toggleOverlay(searchOverlay));
    locationIcon.addEventListener('click', () => toggleOverlay(locationOverlay));

    document.querySelectorAll('.close-overlay').forEach(button => {
        button.addEventListener('click', () => {
            searchOverlay.style.display = 'none';
            locationOverlay.style.display = 'none';
        });
    });

    document.getElementById("searchIcon").addEventListener("click", function() {
        this.classList.toggle("clicked");
        // Additional functionality for opening search overlay
    });
    
    document.getElementById("locationIcon").addEventListener("click", function() {
        this.classList.toggle("clicked");
        // Additional functionality for opening location overlay
    });
    
});



