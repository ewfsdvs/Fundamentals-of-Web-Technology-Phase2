const App = {
    STORAGE_KEYS: {
        CARS: 'used_car_cars'
    },

    init: function() {
        this.initSampleData();
        this.loadFeaturedCars();
        this.loadLatestCars();
        this.initEventListeners();
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

    loadFeaturedCars: function() {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const featuredCars = cars.slice(0, 6);
        const container = document.getElementById('featuredCars');

        if (container) {
            if (featuredCars.length > 0) {
                container.innerHTML = featuredCars.map(car => this.renderCarCard(car)).join('');
            } else {
                container.innerHTML = '<p class="no-results">No cars available at the moment.</p>';
            }
        }
    },

    loadLatestCars: function() {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const latestCars = cars.slice(0, 4);
        const container = document.getElementById('latestCars');

        if (container) {
            if (latestCars.length > 0) {
                container.innerHTML = latestCars.map(car => this.renderCarCard(car)).join('');
            } else {
                container.innerHTML = '<p class="no-results">No cars available at the moment.</p>';
            }
        }
    },

    performHeroSearch: function() {
        const keyword = document.getElementById('heroSearchInput').value.trim();
        if (keyword) {
            window.location.href = `search.html?keyword=${encodeURIComponent(keyword)}`;
        } else {
            window.location.href = 'search.html';
        }
    },

    initEventListeners: function() {
        // Search button click event
        const searchBtn = document.querySelector('.search-box button');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performHeroSearch());
        }

        // Enter key in search input
        const searchInput = document.getElementById('heroSearchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performHeroSearch();
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