// 核心功能模块
const MainModule = {
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
                <button class="btn btn-outline" onclick="MainModule.logout()">Logout</button>
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
    }
};

// 初始化
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MainModule;
} else {
    window.MainModule = MainModule;
}

document.addEventListener('DOMContentLoaded', function() {
    MainModule.init();
});