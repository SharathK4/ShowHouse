class SeatBooking {
    constructor(rows, seatsPerRow, seatPrice) {
        this.rows = rows;
        this.seatsPerRow = seatsPerRow;
        this.seatPrice = seatPrice;
        this.selectedSeats = [];
        this.seatsContainer = document.getElementById("seatsContainer");
        this.totalPriceElement = document.getElementById("totalPrice");
        this.selectedSeatsDisplay = document.getElementById("selectedSeatsDisplay");
        this.buyTicketBtn = document.getElementById("buyTicketBtn");
    }

    async fetchReservedSeats() {
        try {
            const response = await fetch("/api/reserved-seats");

            if (response.ok) {
                const { reservedSeats, tempReservedSeats } = await response.json();
                reservedSeats.concat(tempReservedSeats).forEach((seatId) => {
                    const seat = document.querySelector(`.seat[data-id="${seatId}"]`);
                    if (seat) {
                        seat.classList.remove("available", "selected");
                        seat.classList.add("reserved");
                        seat.removeEventListener("click", this.toggleSeat); // Disable click
                    }
                });
            } else {
                console.error("Failed to fetch reserved seats:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching reserved seats:", error);
        }
    }

    async tempReserveSeats() {
        if (this.selectedSeats.length === 0) {
            alert("Please select at least one seat to proceed.");
            return;
        }

        const data = { selectedSeats: this.selectedSeats };

        try {
            const response = await fetch("/api/temp-reserve-seats", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Navigate to confirmation page
                const ticketData = {
                    movieTitle: "Your Movie Title", // Replace with actual movie title
                    dateTime: "Your Date and Time", // Replace with actual date and time
                    selectedSeats: this.selectedSeats,
                    totalPrice: this.selectedSeats.length * this.seatPrice
                };
                const jsonData = encodeURIComponent(JSON.stringify(ticketData));
                window.location.href = `confirmation.html?data=${jsonData}`;
            } else {
                const errorData = await response.json();
                alert(`Failed to reserve seats: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error reserving seats:", error);
        }
    }

    createSeat(seatId) {
        const seat = document.createElement("div");
        seat.classList.add("seat", "available");
        seat.textContent = seatId;
        seat.dataset.id = seatId;

        seat.addEventListener("click", () => this.toggleSeat(seat));
        return seat;
    }

    createSeats() {
        for (let row = 0; row < this.rows; row++) {
            const rowLabel = String.fromCharCode(65 + row);
            for (let seat = 1; seat <= this.seatsPerRow; seat++) {
                const seatId = `${rowLabel}${seat}`;
                this.seatsContainer.appendChild(this.createSeat(seatId));
            }
        }
    }

    toggleSeat(seat) {
        if (seat.classList.contains("reserved")) return;

        const seatId = seat.dataset.id;
        if (this.selectedSeats.includes(seatId)) {
            this.selectedSeats = this.selectedSeats.filter((id) => id !== seatId);
            seat.classList.remove("selected");
            seat.classList.add("available");
        } else {
            this.selectedSeats.push(seatId);
            seat.classList.remove("available");
            seat.classList.add("selected");
        }
        this.updateBookingInfo();
    }

    updateBookingInfo() {
        const total = this.selectedSeats.length * this.seatPrice;
        this.totalPriceElement.textContent = `₹ ${total.toFixed(2)}`;
        this.selectedSeatsDisplay.textContent =
            this.selectedSeats.length > 0 ? this.selectedSeats.join(", ") : "None selected";
        this.buyTicketBtn.disabled = this.selectedSeats.length === 0;
    }

    addEventListeners() {
        this.buyTicketBtn.addEventListener("click", () => this.tempReserveSeats());
    }

    initialize() {
        this.createSeats();
        this.fetchReservedSeats();
        this.addEventListeners();
    }
}

// Initialize seat booking
document.addEventListener("DOMContentLoaded", () => {
    const seatBooking = new SeatBooking(9, 15, 400);
    seatBooking.initialize();
});

