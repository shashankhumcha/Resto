document.addEventListener('DOMContentLoaded', function() {
    // Example user name
    var userName = "User's Name"; // Replace with actual user's name
    document.getElementById('user-name').innerText = userName;

    // Example restaurant data
    var restaurants = [
        {
            name: "Restaurant 1",
            reviews: "Excellent food and service.",
            image: "restaurant1.jpg",
            food: [
                {
                    name: "Pasta",
                    image: "pasta.jpg",
                    ingredients: "Tomatoes, Cheese, Basil",
                    addons: ["Extra Cheese", "Bacon", "Mushrooms"]
                }
            ]
        },
        {
            name: "Restaurant 2",
            reviews: "Great ambiance and delicious meals.",
            image: "restaurant2.jpg",
            food: [
                {
                    name: "Pizza",
                    image: "pizza.jpg",
                    ingredients: "Flour, Cheese, Tomato Sauce",
                    addons: ["Olives", "Peppers", "Onions"]
                }
            ]
        },
        {
            name: "Restaurant 3",
            reviews: "Great ambiance and delicious meals.",
            image: "restaurant3.jpg",
            food: [
                {
                    name: "chicken nuggets",
                    image: "chicken.jpg",
                    ingredients: "Chicken, Flour, Cheese",
                    addons: ["Oregano", "Shredded mozzarella", "Coke"]
                }
            ]
        },
        {
            name: "Restaurant 4",
            reviews: "Great ambiance and delicious meals.",
            image: "restaurant4.jpg",
            food: [
                {
                    name: "Burger",
                    image: "burger.jpg",
                    ingredients: "Buns, Patty, Onions and Tomatoes",
                    addons: ["Fries", "Coke", "Sauce"]
                }
            ]
        },
        {
            name: "Restaurant 5",
            reviews: "Great ambiance and delicious meals.",
            image: "restaurant5.jpg",
            food: [
                {
                    name: "Biriyani",
                    image: "biriyani.jpg",
                    ingredients: "Rice, Garlic, Onions and Tomatoes, Garam masala, Turmeric.",
                    addons: ["Panneer", "Chicken", "Egg", "Veg(Vegetables)"]
                }
            ]
        },
        {
            name: "Restaurant 6",
            reviews: "Great ambiance and delicious meals.",
            image: "restaurant6.jpg",
            food: [
                {
                    name: "Avacado Crab Boat",
                    image: "crab.jpg",
                    ingredients: "Crab, Mayonnaise, Chopped fresh cilantro, Paprika, Avacado.",
                    addons: ["Lemon wedges", "Minced chives", "Capers"]
                }
            ]
        },
        {
            name: "Restaurant 7",
            reviews: "Great ambiance and delicious meals.",
            image: "restaurant7.jpg",
            food: [
                {
                    name: "Ramen",
                    image: "Ramen.jpg",
                    ingredients: "Ramen noodles, Garlic and ginger, Broth, Dried mushroom.",
                    addons: ["Broth(Veg)", "Broth(Non-veg)", "Egg chilli oil"]
                }
            ]
        },
        {
            name: "Restaurant 8",
            reviews: "Great ambiance and delicious meals.",
            image: "restaurant8.jpg",
            food: [
                {
                    name: "Turkey club sandwich",
                    image: "turkey.jpg",
                    ingredients: "White bread, Tomato, Lettuce, Turkey, Bacon.",
                    addons: ["Fries", "Coke", "Sauce"]
                }
            ]
        }
    ];

    // Populate restaurant cards
    var container = document.getElementById('restaurants-container');
    restaurants.forEach(restaurant => {
        var card = document.createElement('div');
        card.classList.add('restaurant-card');
        card.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.reviews}</p>
        `;
        card.addEventListener('click', function() {
            // Assuming we show the first food item for demo purposes
            openModal(restaurant.food[0]);
        });
        container.appendChild(card);
    });

    // Handle modal functionality
    var modal = document.getElementById('food-modal');
    var span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    function openModal(food) {
        document.getElementById('food-image').src = food.image;
        document.getElementById('food-name').innerText = food.name;
        document.getElementById('food-ingredients').innerText = 'Ingredients: ' + food.ingredients;
        var addonsContainer = document.getElementById('addons');
        addonsContainer.innerHTML = '';
        food.addons.forEach(addon => {
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = addon;
            var label = document.createElement('label');
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(addon));
            addonsContainer.appendChild(label);
        });
        modal.style.display = "block";
    }

    document.getElementById('book-table').addEventListener('click', function() {
        if (validateBookingDetails()) {
            alert("Booking a table...");
            sendBookingData('table');
        }
    });

    document.getElementById('book-takeaway').addEventListener('click', function() {
        if (validateBookingDetails()) {
            alert("Booking for takeaway...");
            sendBookingData('takeaway');
        }
    });

    function validateBookingDetails() {
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;

        if (!phone || !email) {
            alert('Please enter both phone number and email address.');
            return false;
        }
        return true;
    }

    function sendBookingData(type) {
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;

        var bookingData = {
            user: userName,
            phone: phone,
            email: email,
            type: type,
            // Add more details as needed
        };

        fetch('/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Booking confirmed!');
              } else {
                  alert('Booking failed: ' + data.message);
              }
          })
          .catch(error => console.error('Error:', error));
    }

    // Logout button event listener
    document.getElementById('logout-button').addEventListener('click', function() {
        // Perform any necessary cleanup here
        // Redirect to the logout page
        window.location.href = 'logout.html';
    });
});
