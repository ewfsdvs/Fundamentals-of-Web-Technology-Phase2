// Phase 2 - Member 3 (王强) - Car Management JS with LocalStorage

const App = {
    STORAGE_KEYS: {
        CARS: 'used_car_cars',
        CURRENT_USER: 'used_car_current_user'
    },

    init: function() {
        this.initEventListeners();
        this.updateNavbar();
        
        // Load car details if on car detail page
        if (window.location.pathname.includes('car-detail.html')) {
            this.loadCarDetails();
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

    validateCarForm: function() {
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error').forEach(el => el.textContent = '');

        // Validate name
        const name = document.getElementById('name').value;
        if (!name) {
            document.getElementById('nameError').textContent = 'Please enter car name';
            isValid = false;
        }

        // Validate brand
        const brand = document.getElementById('brand').value;
        if (!brand) {
            document.getElementById('brandError').textContent = 'Please select brand';
            isValid = false;
        }

        // Validate year
        const year = document.getElementById('year').value;
        const currentYear = new Date().getFullYear();
        if (!year || year < 2000 || year > currentYear) {
            document.getElementById('yearError').textContent = `Year must be between 2000 and ${currentYear}`;
            isValid = false;
        }

        // Validate mileage
        const mileage = document.getElementById('mileage').value;
        if (!mileage || mileage <= 0 || mileage > 500000) {
            document.getElementById('mileageError').textContent = 'Mileage must be between 1 and 500000 km';
            isValid = false;
        }

        // Validate price
        const price = document.getElementById('price').value;
        if (!price || price <= 0 || price > 10000) {
            document.getElementById('priceError').textContent = 'Price must be between 0.1 and 10000万';
            isValid = false;
        }

        // Validate condition
        const condition = document.getElementById('condition').value;
        if (!condition) {
            document.getElementById('conditionError').textContent = 'Please select condition';
            isValid = false;
        }

        // Validate description
        const description = document.getElementById('description').value;
        if (!description || description.length < 10) {
            document.getElementById('descriptionError').textContent = 'Description must be at least 10 characters';
            isValid = false;
        }

        // Validate image
        const image = document.getElementById('image').files[0];
        if (!image) {
            document.getElementById('imageError').textContent = 'Please upload an image';
            isValid = false;
        }

        return isValid;
    },

    handleImageUpload: function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('imagePreview');
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    },

    addCar: function(carData) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const currentUser = this.getStorageItem(this.STORAGE_KEYS.CURRENT_USER, null);
        
        const newCar = {
            ...carData,
            id: this.generateId('car'),
            sellerId: currentUser ? currentUser.id : 'guest',
            createdAt: new Date().toISOString()
        };
        
        cars.push(newCar);
        this.setStorageItem(this.STORAGE_KEYS.CARS, cars);
        
        return { success: true, car: newCar };
    },

    getCarById: function(carId) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        return cars.find(car => car.id === carId);
    },

    getRelatedCars: function(currentCarId, limit = 4) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        return cars
            .filter(car => car.id !== currentCarId)
            .slice(0, limit);
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

    loadCarDetails: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('id') || 'car_001';
        const car = this.getCarById(carId);
        
        const container = document.getElementById('carDetailContainer');
        if (container && car) {
            container.innerHTML = `
                <div class="car-detail-container">
                    <div class="car-image">
                        <img src="${car.image}" alt="${car.name}">
                    </div>
                    <div class="car-info">
                        <h1>${car.name}</h1>
                        <div class="car-meta">
                            <div class="meta-item">
                                <span class="meta-label">Brand</span>
                                <span class="meta-value">${car.brand}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Year</span>
                                <span class="meta-value">${car.year}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Mileage</span>
                                <span class="meta-value">${this.formatMileage(car.mileage)}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Condition</span>
                                <span class="status-badge ${this.getConditionClass(car.condition)}">${this.getConditionLabel(car.condition)}</span>
                            </div>
                        </div>
                        <div class="car-price">${this.formatPrice(car.price)} <small>万</small></div>
                        <div class="car-description">
                            <h2>Description</h2>
                            <p>${car.description}</p>
                        </div>
                        <div class="action-buttons">
                            <button class="btn btn-primary">Contact Seller</button>
                            <button class="btn btn-outline">Save to Favorites</button>
                        </div>
                    </div>
                </div>
            `;
        } else if (container) {
            container.innerHTML = '<p class="no-results">Car not found</p>';
        }

        // Load related cars
        this.loadRelatedCars(carId);
    },

    loadRelatedCars: function(currentCarId) {
        const relatedCars = this.getRelatedCars(currentCarId, 4);
        const container = document.getElementById('relatedCars');
        
        if (container) {
            if (relatedCars.length > 0) {
                container.innerHTML = relatedCars.map(car => this.renderCarCard(car)).join('');
            } else {
                container.innerHTML = '<p class="no-results">No related cars found</p>';
            }
        }
    },

    updateNavbar: function() {
        const currentUser = this.getStorageItem(this.STORAGE_KEYS.CURRENT_USER, null);
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
        localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
        this.updateNavbar();
        window.location.href = 'index.html';
    },

    initEventListeners: function() {
        // Image upload preview
        const imageInput = document.getElementById('image');
        if (imageInput) {
            imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        }

        // Add car form submission
        const addCarForm = document.getElementById('addCarForm');
        if (addCarForm) {
            addCarForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateCarForm()) {
                    const imageInput = document.getElementById('image');
                    const file = imageInput.files[0];
                    
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const carData = {
                            name: document.getElementById('name').value,
                            brand: document.getElementById('brand').value,
                            year: parseInt(document.getElementById('year').value),
                            mileage: parseInt(document.getElementById('mileage').value),
                            price: parseFloat(document.getElementById('price').value),
                            condition: document.getElementById('condition').value,
                            description: document.getElementById('description').value,
                            image: e.target.result
                        };
                        
                        const result = this.addCar(carData);
                        if (result.success) {
                            alert('Car listed successfully!');
                            window.location.href = 'index.html';
                        } else {
                            alert('Failed to list car');
                        }
                    };
                    reader.readAsDataURL(file);
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