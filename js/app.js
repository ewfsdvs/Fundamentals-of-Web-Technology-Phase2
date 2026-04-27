const App = {
    STORAGE_KEYS: {
        USERS: 'used_car_users',
        CARS: 'used_car_cars',
        CURRENT_USER: 'used_car_current_user'
    },

    API_BASE_URL: '',

    init: function() {
        this.checkAuthStatus();
        this.initNavigation();
        this.initSampleData();
    },

    checkAuthStatus: function() {
        const currentUser = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
        this.updateAuthUI(currentUser);
    },

    updateAuthUI: function(user) {
        const authButtons = document.querySelector('.navbar-auth');
        if (!authButtons) return;

        if (user) {
            const userData = JSON.parse(user);
            authButtons.innerHTML = `
                <span style="color: var(--text-primary);">Welcome, ${userData.username}</span>
                <button class="btn btn-outline" onclick="App.logout()">Logout</button>
            `;
        } else {
            authButtons.innerHTML = `
                <a href="login.html" class="btn btn-outline">Login</a>
                <a href="register.html" class="btn btn-primary">Register</a>
            `;
        }
    },

    logout: function() {
        localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
        window.location.href = 'index.html';
    },

    initNavigation: function() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-menu a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navbarMenu = document.querySelector('.navbar-menu');
        if (mobileMenuBtn && navbarMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navbarMenu.classList.toggle('active');
            });
        }
    },

    initSampleData: function() {
        const cars = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.CARS) || '[]');
        if (cars.length === 0) {
            const sampleCars = [
                {
                    id: 'car_001',
                    name: 'BMW 3 Series 320i',
                    brand: 'BMW',
                    year: 2022,
                    mileage: 15000,
                    price: 28.5,
                    condition: 'excellent',
                    description: 'Excellent condition, low mileage, full service history. Leather seats, sunroof, parking sensors.',
                    image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzI1NjNlYiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+Qk1XPC90ZXh0Pjwvc3ZnPg==',
                    sellerId: 'user_001',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'car_002',
                    name: 'Mercedes-Benz C-Class C200',
                    brand: 'Mercedes-Benz',
                    year: 2021,
                    mileage: 25000,
                    price: 32.0,
                    condition: 'good',
                    description: 'Well maintained, automatic transmission, GPS navigation, backup camera.',
                    image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzY0NzQ4YiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+TVQ8L3RleHQ+PC9zdmc+',
                    sellerId: 'user_002',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'car_003',
                    name: 'Audi A4 40 TFSI',
                    brand: 'Audi',
                    year: 2023,
                    mileage: 8000,
                    price: 35.8,
                    condition: 'excellent',
                    description: 'Like new condition, only 8000km, full options including virtual cockpit.',
                    image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzIyNjdlZiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGlpdGU+QVVESSA8L3RleHQ+PC9zdmc+',
                    sellerId: 'user_001',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'car_004',
                    name: 'Toyota Camry 2.5L',
                    brand: 'Toyota',
                    year: 2020,
                    mileage: 45000,
                    price: 18.5,
                    condition: 'good',
                    description: 'Reliable family car, automatic, low fuel consumption, recent maintenance.',
                    image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VmNjQ0NCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGlpdGU+VFlPVk9UPC90ZXh0Pjwvc3ZnPg==',
                    sellerId: 'user_003',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'car_005',
                    name: 'Honda Civic 1.5T',
                    brand: 'Honda',
                    year: 2022,
                    mileage: 20000,
                    price: 16.8,
                    condition: 'excellent',
                    description: 'Sporty design, turbo engine, fuel efficient, modern features.',
                    image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzEwYjk4MSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGlpdGU+SE9OREE8L3RleHQ+PC9zdmc+',
                    sellerId: 'user_002',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'car_006',
                    name: 'Tesla Model 3 Standard Range',
                    brand: 'Tesla',
                    year: 2023,
                    mileage: 5000,
                    price: 25.9,
                    condition: 'excellent',
                    description: 'Electric vehicle, autopilot enabled, zero emissions, modern tech.',
                    image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzI1NjNlYiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGlpdGU+VEVTTEEgPC90ZXh0Pjwvc3ZnPg==',
                    sellerId: 'user_004',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem(this.STORAGE_KEYS.CARS, JSON.stringify(sampleCars));
        }

        const users = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USERS) || '[]');
        if (users.length === 0) {
            const sampleUsers = [
                {
                    id: 'user_001',
                    username: 'john_seller',
                    email: 'john@example.com',
                    password: 'Test1234',
                    phone: '13800138000',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(sampleUsers));
        }
    },

    getCurrentUser: function() {
        const userStr = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
        return userStr ? JSON.parse(userStr) : null;
    },

    isLoggedIn: function() {
        return !!localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
    },

    requireAuth: function() {
        if (!this.isLoggedIn()) {
            alert('Please login first!');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    showAlert: function(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} show`;
        alertDiv.textContent = message;
        return alertDiv;
    },

    formatPrice: function(price) {
        return '¥' + price.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    },

    formatMileage: function(mileage) {
        return mileage.toLocaleString() + ' km';
    },

    getConditionLabel: function(condition) {
        const labels = {
            'excellent': 'Excellent',
            'good': 'Good',
            'medium': 'Medium'
        };
        return labels[condition] || condition;
    },

    getConditionClass: function(condition) {
        const classes = {
            'excellent': 'excellent',
            'good': 'good',
            'medium': 'medium'
        };
        return classes[condition] || '';
    },

    generateId: function(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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

    validateYear: function(year) {
        const currentYear = new Date().getFullYear();
        return year >= 2000 && year <= currentYear;
    },

    validateMileage: function(mileage) {
        return mileage > 0 && mileage < 500000;
    },

    validatePrice: function(price) {
        return price > 0 && price < 10000;
    },

    getUrlParams: function() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        return params;
    },

    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
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

    getStorageItem: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage error:', e);
            return defaultValue;
        }
    },

    removeStorageItem: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    renderCarCard: function(car) {
        return `
            <div class="car-card fade-in" onclick="window.location.href='car-detail.html?id=${car.id}'">
                <img src="${car.image}" alt="${car.name}" class="car-card-image">
                <div class="car-card-content">
                    <h3 class="car-card-title">${car.name}</h3>
                    <div class="car-card-info">
                        <span>${car.brand}</span>
                        <span>${car.year}</span>
                        <span>${this.formatMileage(car.mileage)}</span>
                        <span class="status-badge ${this.getConditionClass(car.condition)}">${this.getConditionLabel(car.condition)}</span>
                    </div>
                    <div class="car-card-price">
                        ${this.formatPrice(car.price)} <small>万</small>
                    </div>
                </div>
            </div>
        `;
    },

    searchCars: function(criteria = {}) {
        let cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);

        if (criteria.keyword) {
            const keyword = criteria.keyword.toLowerCase();
            cars = cars.filter(car =>
                car.name.toLowerCase().includes(keyword) ||
                car.brand.toLowerCase().includes(keyword) ||
                car.description.toLowerCase().includes(keyword)
            );
        }

        if (criteria.brand && criteria.brand !== 'all') {
            cars = cars.filter(car => car.brand === criteria.brand);
        }

        if (criteria.minPrice) {
            cars = cars.filter(car => car.price >= parseFloat(criteria.minPrice));
        }

        if (criteria.maxPrice) {
            cars = cars.filter(car => car.price <= parseFloat(criteria.maxPrice));
        }

        if (criteria.year && criteria.year !== 'all') {
            cars = cars.filter(car => car.year.toString() === criteria.year);
        }

        if (criteria.condition && criteria.condition !== 'all') {
            cars = cars.filter(car => car.condition === criteria.condition);
        }

        return cars;
    },

    getCarById: function(carId) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        return cars.find(car => car.id === carId);
    },

    getCarsBySeller: function(sellerId) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        return cars.filter(car => car.sellerId === sellerId);
    },

    addCar: function(carData) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const newCar = {
            ...carData,
            id: this.generateId('car'),
            createdAt: new Date().toISOString()
        };
        cars.unshift(newCar);
        this.setStorageItem(this.STORAGE_KEYS.CARS, cars);
        return newCar;
    },

    updateCar: function(carId, carData) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const index = cars.findIndex(car => car.id === carId);
        if (index !== -1) {
            cars[index] = { ...cars[index], ...carData };
            this.setStorageItem(this.STORAGE_KEYS.CARS, cars);
            return cars[index];
        }
        return null;
    },

    deleteCar: function(carId) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const filteredCars = cars.filter(car => car.id !== carId);
        this.setStorageItem(this.STORAGE_KEYS.CARS, filteredCars);
        return true;
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
            id: this.generateId('user'),
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

    getAllBrands: function() {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const brands = [...new Set(cars.map(car => car.brand))];
        return brands.sort();
    },

    getAllYears: function() {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const years = [...new Set(cars.map(car => car.year))];
        return years.sort((a, b) => b - a);
    },

    getRelatedCars: function(carId, limit = 4) {
        const currentCar = this.getCarById(carId);
        if (!currentCar) return [];

        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        return cars
            .filter(car => car.id !== carId && car.brand === currentCar.brand)
            .slice(0, limit);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    App.init();
});
