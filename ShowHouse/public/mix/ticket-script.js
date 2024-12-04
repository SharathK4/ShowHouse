class TicketConfirmation {
    constructor() {
        this.movieTitleElement = document.getElementById("movieTitle");
        this.dateTimeElement = document.getElementById("dateTime");
        this.seatsElement = document.getElementById("seats");
        this.totalPriceElement = document.getElementById("totalPrice");
        this.qrCodeElement = document.getElementById("qrCode");
        this.confirmButton = document.getElementById("confirmButton");
    }

    initialize() {
        const urlParams = new URLSearchParams(window.location.search);
        const jsonData = urlParams.get("data");

        if (jsonData) {
            try {
                const ticketData = JSON.parse(decodeURIComponent(jsonData));
                this.populateTicketDetails(ticketData);
                this.generateQRCode(ticketData);
                this.addConfirmButtonListener(ticketData.selectedSeats);
            } catch (error) {
                console.error("Error parsing ticket data:", error);
                this.movieTitleElement.textContent = "Error: Invalid Ticket Data";
            }
        } else {
            this.movieTitleElement.textContent = "Error: No Data Available";
        }
    }

    populateTicketDetails(ticketData) {
        this.movieTitleElement.textContent = ticketData.movieTitle || "Movie Title";
        this.dateTimeElement.textContent = ticketData.dateTime || "Date and Time";
        this.seatsElement.textContent = ticketData.selectedSeats?.join(", ") || "None";
        this.totalPriceElement.textContent = `₹ ${ticketData.totalPrice?.toFixed(2) || "0.00"}`;
    }

    generateQRCode(ticketData) {
        const qr = qrcode(0, "M");
        const qrText = `Movie: ${ticketData.movieTitle}\nDate/Time: ${ticketData.dateTime}\nSeats: ${ticketData.selectedSeats.join(", ")}\nTotal: ₹ ${ticketData.totalPrice}`;
        qr.addData(qrText);
        qr.make();
        this.qrCodeElement.innerHTML = qr.createImgTag(4);
    }

    addConfirmButtonListener(selectedSeats) {
        this.confirmButton.addEventListener("click", async () => {
            try {
                const response = await fetch("/api/confirm-seats", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ selectedSeats }),
                });

                if (response.ok) {
                    alert("Seats confirmed successfully!");
                    // Disable the confirm button after successful confirmation
                    this.confirmButton.disabled = true;
                } else {
                    const errorData = await response.json();
                    alert(`Failed to confirm seats: ${errorData.error}`);
                }
            } catch (error) {
                console.error("Error confirming seats:", error);
                alert("An error occurred while confirming seats. Please try again.");
            }
        });
    }
}

// Initialize ticket confirmation
document.addEventListener("DOMContentLoaded", () => {
    const ticketConfirmation = new TicketConfirmation();
    ticketConfirmation.initialize();
});

