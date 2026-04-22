// Phase 1 - Member 2 (李娜) - User Authentication JS

// Registration form validation
function validateRegisterForm() {
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Validate username
    const username = document.getElementById('username').value;
    if (!username || username.length < 4 || username.length > 20) {
        document.getElementById('usernameError').textContent = 'Username must be between 4 and 20 characters';
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Validate password
    const password = document.getElementById('password').value;
    if (!password || password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
        isValid = false;
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        document.getElementById('passwordError').textContent = 'Password must contain uppercase, lowercase, and number';
        isValid = false;
    }

    // Validate confirm password
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword !== password) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    // Validate phone
    const phone = document.getElementById('phone').value;
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid Chinese phone number';
        isValid = false;
    }

    return isValid;
}

// Login form validation
function validateLoginForm() {
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Validate email or username
    const emailOrUsername = document.getElementById('emailOrUsername').value;
    if (!emailOrUsername) {
        document.getElementById('emailOrUsernameError').textContent = 'Please enter your email or username';
        isValid = false;
    }

    // Validate password
    const password = document.getElementById('password').value;
    if (!password) {
        document.getElementById('passwordError').textContent = 'Please enter your password';
        isValid = false;
    }

    return isValid;
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegisterForm()) {
                alert('Registration successful!');
                window.location.href = 'login.html';
            }
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm()) {
                alert('Login successful!');
                window.location.href = 'index.html';
            }
        });
    }
});