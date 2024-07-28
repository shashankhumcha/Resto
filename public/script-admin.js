document.addEventListener('DOMContentLoaded', function() {
    // Example data - replace with actual data from your backend
    var users = [
        { username: "john_doe", role: "user", email: "john.doe@example.com", phone: "123-456-7890" },
        { username: "admin_user", role: "admin", email: "admin@example.com", phone: "987-654-3210" }
    ];

    var bookings = [
        { user: "john_doe", phone: "123-456-7890", email: "john.doe@example.com", type: "table", status: "Confirmed", date: "2024-07-27T18:00:00Z" },
        { user: "admin_user", phone: "987-654-3210", email: "admin@example.com", type: "takeaway", status: "Pending", date: "2024-07-28T12:00:00Z" }
    ];

    var usersContainer = document.getElementById('users-container');
    var bookingsContainer = document.getElementById('bookings-container');

    // Populate user list
    users.forEach(user => {
        var userItem = document.createElement('li');
        userItem.classList.add('user-item');
        userItem.innerHTML = `
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
        `;
        usersContainer.appendChild(userItem);
    });

    // Populate bookings
    bookings.forEach(booking => {
        var bookingItem = document.createElement('div');
        bookingItem.classList.add('booking-item');
        bookingItem.innerHTML = `
            <p><strong>User:</strong> ${booking.user}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Type:</strong> ${booking.type}</p>
            <p><strong>Status:</strong> ${booking.status}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleString()}</p>
        `;
        bookingsContainer.appendChild(bookingItem);
    });

    // Logout button event listener
    document.getElementById('logout-button').addEventListener('click', function() {
        // Perform any necessary cleanup here
        // Redirect to login page
        window.location.href = 'index.html';
    });
});
