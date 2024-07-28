document.addEventListener('DOMContentLoaded', function() {
    var registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var username = document.getElementById('reg-username').value;
            var password = document.getElementById('reg-password').value;
            var role = document.getElementById('reg-role').value;

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password, role: role })
            }).then(response => response.json())
              .then(data => {
                  if (data.success) {
                      alert('Registration successful! Please login.');
                      window.location.href = 'index.html';
                  } else {
                      alert('Registration failed: ' + data.message);
                  }
              })
              .catch(error => console.error('Error:', error));
        });
    }

    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            }).then(response => response.json())
              .then(data => {
                  if (data.success) {
                      if (data.role === 'admin') {
                          window.location.href = 'admin.html';
                      } else {
                          window.location.href = 'user.html';
                      }
                  } else {
                      alert('Login failed! Please check your username and password.');
                  }
              })
              .catch(error => console.error('Error:', error));
        });
    }
});
