// Phase 2 - Member 2 (李娜) - User Authentication JS with LocalStorage

const App = {
    STORAGE_KEYS: {
        USERS: 'used_car_users',
        CURRENT_USER: 'used_car_current_user'
    },

    init: function() {
        this.initSampleData();
        this.initEventListeners();
        this.updateNavbar();
    },

    initSampleData: function() {
        const users = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USERS) || '[]');
        if (users.length === 0) {
            const sampleUsers = [
                {
                    id: 'user_001',
                    username: 'admin',
                    email: 'admin@example.com',
                    password: 'Admin123!',
                    phone: '13800138000',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'user_002',
                    username: 'user1',
                    email: 'user1@example.com',
                    password: 'Password123!',
                    phone: '13900139000',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(sampleUsers));
        }
    },

    getStorageItem: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage error:', e);
            return defaultValue;
        }
    },

    setStorageItem: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    generateId: function(prefix) {
        return prefix + '_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    },

    validateRegisterForm: function() {
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
    },

    validateLoginForm: function() {
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
    },

    registerUser: function(userData) {
        const users = this.getStorageItem(this.STORAGE_KEYS.USERS, []);
        
        // Check if user already exists
        const existingUser = users.find(user => 
            user.email === userData.email || user.username === userData.username
        );
        
        if (existingUser) {
            return { success: false, message: 'User already exists' };
        }
        
        // Create new user
        const newUser = {
            ...userData,
            id: this.generateId('user'),
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        this.setStorageItem(this.STORAGE_KEYS.USERS, users);
        
        return { success: true, user: newUser };
    },

    loginUser: function(emailOrUsername, password) {
        const users = this.getStorageItem(this.STORAGE_KEYS.USERS, []);
        
        const user = users.find(user => 
            user.email === emailOrUsername || user.username === emailOrUsername
        );
        
        if (!user) {
            return { success: false, message: 'Invalid credentials' };
        }
        
        if (user.password !== password) {
            return { success: false, message: 'Invalid credentials' };
        }
        
        // Store current user
        this.setStorageItem(this.STORAGE_KEYS.CURRENT_USER, user);
        
        return { success: true, user: user };
    },

    logoutUser: function() {
        localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
        this.updateNavbar();
        window.location.href = 'index.html';
    },

    getCurrentUser: function() {
        return this.getStorageItem(this.STORAGE_KEYS.CURRENT_USER, null);
    },

    updateNavbar: function() {
        const currentUser = this.getCurrentUser();
        const authButtons = document.querySelector('.navbar-auth');
        
        if (authButtons) {
            if (currentUser) {
                authButtons.innerHTML = `
                    <span class="user-greeting">Welcome, ${currentUser.username}</span>
                    <button class="btn btn-outline" onclick="App.logoutUser()">Logout</button>
                `;
            } else {
                authButtons.innerHTML = `
                    <a href="login.html" class="btn btn-outline">Login</a>
                    <a href="register.html" class="btn btn-primary">Register</a>
                `;
            }
        }
    },

    initEventListeners: function() {
        // Register form submission
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateRegisterForm()) {
                    const userData = {
                        username: document.getElementById('username').value,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                        phone: document.getElementById('phone').value
                    };
                    
                    const result = this.registerUser(userData);
                    if (result.success) {
                        alert('Registration successful!');
                        window.location.href = 'login.html';
                    } else {
                        alert(result.message);
                    }
                }
            });
        }

        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateLoginForm()) {
                    const emailOrUsername = document.getElementById('emailOrUsername').value;
                    const password = document.getElementById('password').value;
                    
                    const result = this.loginUser(emailOrUsername, password);
                    if (result.success) {
                        alert('Login successful!');
                        window.location.href = 'index.html';
                    } else {
                        alert(result.message);
                    }
                }
            });
        }

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                const menu = document.querySelector('.navbar-menu');
                menu.classList.toggle('active');
            });
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});