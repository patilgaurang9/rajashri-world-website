export function generateBookingEmailHTML(bookingData: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .booking-details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .total { font-size: 18px; font-weight: bold; color: #ef4444; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Booking Request</h1>
          <p>Booking ID: ${bookingData.bookingId}</p>
        </div>
        
        <div class="content">
          <div class="booking-details">
            <h3>Tour Details</h3>
            <p><strong>Tour:</strong> ${bookingData.tour}</p>
            <p><strong>Date:</strong> ${bookingData.selectedDate}</p>
            <p><strong>Accommodation:</strong> ${bookingData.selectedAccommodation}</p>
          </div>
          
          <div class="booking-details">
            <h3>Lead Traveller</h3>
            <p><strong>Name:</strong> ${bookingData.leadTraveller.title} ${bookingData.leadTraveller.firstName} ${bookingData.leadTraveller.lastName}</p>
            <p><strong>Email:</strong> ${bookingData.leadTraveller.email}</p>
            <p><strong>Phone:</strong> ${bookingData.leadTraveller.phone}</p>
            <p><strong>Date of Birth:</strong> ${bookingData.leadTraveller.dateOfBirth}</p>
            <p><strong>Gender:</strong> ${bookingData.leadTraveller.gender}</p>
          </div>
          
          <div class="booking-details">
            <h3>Traveller Count</h3>
            <p><strong>Adults:</strong> ${bookingData.travellerCounts.adults}</p>
            <p><strong>Children (5-11):</strong> ${bookingData.travellerCounts.children}</p>
            <p><strong>Children (2-4):</strong> ${bookingData.travellerCounts.childrenAge2to4}</p>
            <p><strong>Infants:</strong> ${bookingData.travellerCounts.infants}</p>
          </div>
          
          <div class="booking-details">
            <p class="total">Total Amount: ₹${bookingData.totalPrice.toLocaleString()}</p>
            <p><strong>Booking Time:</strong> ${new Date(bookingData.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
