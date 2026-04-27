// 用户认证模块
const AuthModule = {
    STORAGE_KEYS: {
        USERS: 'used_car_users',
        CURRENT_USER: 'used_car_current_user'
    },

    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    validatePhone: function(phone) {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    },

    validatePassword: function(password) {
        return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
    },

    validateUsername: function(username) {
        return /^[a-zA-Z0-9_]{4,20}$/.test(username);
    },

    validateRegisterForm: function(form) {
        let isValid = true;
        const formGroups = form.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) errorMessage.textContent = '';
        });

        // 用户名验证
        const usernameInput = form.querySelector('input[name="username"]');
        if (usernameInput) {
            if (!this.validateUsername(usernameInput.value)) {
                this.showError(usernameInput, 'Username must be 4-20 characters and only contain letters, numbers, and underscores');
                isValid = false;
            }
        }

        // 邮箱验证
        const emailInput = form.querySelector('input[name="email"]');
        if (emailInput) {
            if (!this.validateEmail(emailInput.value)) {
                this.showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // 密码验证
        const passwordInput = form.querySelector('input[name="password"]');
        if (passwordInput) {
            if (!this.validatePassword(passwordInput.value)) {
                this.showError(passwordInput, 'Password must be at least 8 characters and contain uppercase, lowercase, and number');
                isValid = false;
            }
        }

        // 确认密码验证
        const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');
        if (confirmPasswordInput && passwordInput) {
            if (confirmPasswordInput.value !== passwordInput.value) {
                this.showError(confirmPasswordInput, 'Passwords do not match');
                isValid = false;
            }
        }

        // 手机号验证
        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput) {
            if (!this.validatePhone(phoneInput.value)) {
                this.showError(phoneInput, 'Please enter a valid Chinese phone number');
                isValid = false;
            }
        }

        return isValid;
    },

    validateLoginForm: function(form) {
        let isValid = true;
        const formGroups = form.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) errorMessage.textContent = '';
        });

        // 邮箱或用户名验证
        const emailOrUsernameInput = form.querySelector('input[name="emailOrUsername"]');
        if (emailOrUsernameInput) {
            if (!emailOrUsernameInput.value.trim()) {
                this.showError(emailOrUsernameInput, 'Please enter your email or username');
                isValid = false;
            }
        }

        // 密码验证
        const passwordInput = form.querySelector('input[name="password"]');
        if (passwordInput) {
            if (!passwordInput.value) {
                this.showError(passwordInput, 'Please enter your password');
                isValid = false;
            }
        }

        return isValid;
    },

    showError: function(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.textContent = message;
            }
        }
    },

    registerUser: function(userData) {
        const users = this.getStorageItem(this.STORAGE_KEYS.USERS, []);
        const existingUser = users.find(user =>
            user.email === userData.email || user.username === userData.username
        );
        if (existingUser) {
            return { success: false, message: 'User already exists' };
        }
        const newUser = {
            ...userData,
            id: MainModule.generateId('user'),
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        this.setStorageItem(this.STORAGE_KEYS.USERS, users);
        return { success: true, user: newUser };
    },

    loginUser: function(emailOrUsername, password) {
        const users = this.getStorageItem(this.STORAGE_KEYS.USERS, []);
        const user = users.find(u =>
            (u.email === emailOrUsername || u.username === emailOrUsername) &&
            u.password === password
        );
        if (user) {
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;
            this.setStorageItem(this.STORAGE_KEYS.CURRENT_USER, userWithoutPassword);
            return { success: true, user: userWithoutPassword };
        }
        return { success: false, message: 'Invalid credentials' };
    },

    getStorageItem: function(key, defaultValue = null) {
        return MainModule.getStorageItem(key, defaultValue);
    },

    setStorageItem: function(key, value) {
        return MainModule.setStorageItem(key, value);
    },

    initRegisterForm: function() {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateRegisterForm(registerForm)) {
                    const userData = {
                        username: document.querySelector('input[name="username"]').value,
                        email: document.querySelector('input[name="email"]').value,
                        password: document.querySelector('input[name="password"]').value,
                        phone: document.querySelector('input[name="phone"]').value
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
    },

    initLoginForm: function() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateLoginForm(loginForm)) {
                    const emailOrUsername = document.querySelector('input[name="emailOrUsername"]').value;
                    const password = document.querySelector('input[name="password"]').value;
                    
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
    },

    init: function() {
        this.initRegisterForm();
        this.initLoginForm();
    }
};

// 初始化
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthModule;
} else {
    window.AuthModule = AuthModule;
}

document.addEventListener('DOMContentLoaded', function() {
    AuthModule.init();
});