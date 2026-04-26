// Phase 2 - Member 4 (陈明) - Search Functionality JS with LocalStorage

const App = {
    STORAGE_KEYS: {
        CARS: 'used_car_cars'
    },

    currentPage: 1,
    itemsPerPage: 6,
    sortedCars: [],

    init: function() {
        this.initSampleData();
        this.loadCars();
        this.initEventListeners();
        this.updateNavbar();
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

        if (criteria.brand && criteria.brand !== '') {
            cars = cars.filter(car => car.brand === criteria.brand);
        }

        if (criteria.minPrice) {
            cars = cars.filter(car => car.price >= parseFloat(criteria.minPrice));
        }

        if (criteria.maxPrice) {
            cars = cars.filter(car => car.price <= parseFloat(criteria.maxPrice));
        }

        if (criteria.year && criteria.year !== '') {
            cars = cars.filter(car => car.year.toString() === criteria.year);
        }

        if (criteria.condition && criteria.condition !== '') {
            cars = cars.filter(car => car.condition === criteria.condition);
        }

        return cars;
    },

    sortCars: function(cars, sortBy) {
        switch (sortBy) {
            case 'price-asc':
                return cars.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return cars.sort((a, b) => b.price - a.price);
            case 'year-desc':
                return cars.sort((a, b) => b.year - a.year);
            case 'mileage-asc':
                return cars.sort((a, b) => a.mileage - b.mileage);
            default:
                return cars;
        }
    },

    paginateCars: function(cars, page, itemsPerPage) {
        const startIndex = (page - 1) * itemsPerPage;
        return cars.slice(startIndex, startIndex + itemsPerPage);
    },

    loadCars: function() {
        const criteria = this.getSearchCriteria();
        let cars = this.searchCars(criteria);
        cars = this.sortCars(cars, document.getElementById('sortSelect').value);
        this.sortedCars = cars;
        this.renderCars(cars);
        this.renderPagination(cars.length);
        document.getElementById('resultsCount').textContent = `Showing ${cars.length} results`;
    },

    renderCars: function(cars) {
        const container = document.getElementById('carGrid');
        const paginatedCars = this.paginateCars(cars, this.currentPage, this.itemsPerPage);

        if (paginatedCars.length > 0) {
            container.innerHTML = paginatedCars.map(car => this.renderCarCard(car)).join('');
        } else {
            container.innerHTML = '<div class="no-results">No cars found matching your criteria</div>';
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
                        <span>${car.mileage.toLocaleString()} km</span>
                        <span class="status-badge ${this.getConditionClass(car.condition)}">${this.getConditionLabel(car.condition)}</span>
                    </div>
                    <div class="car-card-price">
                        ¥${car.price.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} <small>万</small>
                    </div>
                </div>
            </div>
        `;
    },

    renderPagination: function(totalItems) {
        const container = document.getElementById('pagination');
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);

        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="page-btn ${i === this.currentPage ? 'active' : ''}" onclick="App.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        container.innerHTML = paginationHTML;
    },

    goToPage: function(page) {
        this.currentPage = page;
        this.loadCars();
    },

    getSearchCriteria: function() {
        return {
            keyword: document.getElementById('keyword').value.trim(),
            brand: document.getElementById('brand').value,
            minPrice: document.getElementById('minPrice').value,
            maxPrice: document.getElementById('maxPrice').value,
            year: document.getElementById('year').value,
            condition: document.getElementById('condition').value
        };
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

    showSearchSuggestions: function(keyword) {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (!keyword) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const suggestions = cars
            .filter(car => car.name.toLowerCase().includes(keyword.toLowerCase()) || car.brand.toLowerCase().includes(keyword.toLowerCase()))
            .slice(0, 5);

        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(car => `
                <div class="search-suggestion" onclick="App.selectSuggestion('${car.name}')">
                    <div class="suggestion-brand">${car.brand}</div>
                    <div class="suggestion-model">${car.name}</div>
                </div>
            `).join('');
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    },

    selectSuggestion: function(name) {
        document.getElementById('keyword').value = name;
        document.getElementById('searchSuggestions').style.display = 'none';
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

    updateNavbar: function() {
        const currentUser = this.getStorageItem('used_car_current_user', null);
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

    logoutUser: function() {
        localStorage.removeItem('used_car_current_user');
        this.updateNavbar();
        window.location.href = 'index.html';
    },

    initEventListeners: function() {
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.currentPage = 1;
            this.loadCars();
        });

        document.getElementById('sortSelect').addEventListener('change', () => {
            this.currentPage = 1;
            this.loadCars();
        });

        document.getElementById('keyword').addEventListener('input', this.debounce((e) => {
            this.showSearchSuggestions(e.target.value);
        }, 300));

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.form-group')) {
                document.getElementById('searchSuggestions').style.display = 'none';
            }
        });

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