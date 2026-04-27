// 车辆管理模块
const CarModule = {
    STORAGE_KEYS: {
        CARS: 'used_car_cars',
        CURRENT_USER: 'used_car_current_user'
    },

    validateCarForm: function(form) {
        let isValid = true;
        const formGroups = form.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) errorMessage.textContent = '';
        });

        // 车辆名称验证
        const nameInput = form.querySelector('input[name="name"]');
        if (nameInput && !nameInput.value.trim()) {
            this.showError(nameInput, 'Please enter car name');
            isValid = false;
        }

        // 品牌验证
        const brandSelect = form.querySelector('select[name="brand"]');
        if (brandSelect && !brandSelect.value) {
            this.showError(brandSelect, 'Please select brand');
            isValid = false;
        }

        // 年份验证
        const yearInput = form.querySelector('input[name="year"]');
        if (yearInput) {
            const year = parseInt(yearInput.value);
            const currentYear = new Date().getFullYear();
            if (isNaN(year) || year < 2000 || year > currentYear) {
                this.showError(yearInput, `Year must be between 2000 and ${currentYear}`);
                isValid = false;
            }
        }

        // 里程验证
        const mileageInput = form.querySelector('input[name="mileage"]');
        if (mileageInput) {
            const mileage = parseInt(mileageInput.value);
            if (isNaN(mileage) || mileage <= 0 || mileage > 500000) {
                this.showError(mileageInput, 'Mileage must be between 1 and 500000 km');
                isValid = false;
            }
        }

        // 价格验证
        const priceInput = form.querySelector('input[name="price"]');
        if (priceInput) {
            const price = parseFloat(priceInput.value);
            if (isNaN(price) || price <= 0 || price > 10000) {
                this.showError(priceInput, 'Price must be between 0.1 and 10000万');
                isValid = false;
            }
        }

        // 车况验证
        const conditionSelect = form.querySelector('select[name="condition"]');
        if (conditionSelect && !conditionSelect.value) {
            this.showError(conditionSelect, 'Please select condition');
            isValid = false;
        }

        // 描述验证
        const descriptionTextarea = form.querySelector('textarea[name="description"]');
        if (descriptionTextarea && descriptionTextarea.value.trim().length < 10) {
            this.showError(descriptionTextarea, 'Description must be at least 10 characters');
            isValid = false;
        }

        // 图片验证
        const imageInput = form.querySelector('input[name="image"]');
        if (imageInput && !imageInput.files.length) {
            this.showError(imageInput, 'Please upload an image');
            isValid = false;
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

    handleImageUpload: function(input, previewId) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById(previewId);
                if (preview) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        }
    },

    addCar: function(carData) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const newCar = {
            ...carData,
            id: MainModule.generateId('car'),
            createdAt: new Date().toISOString()
        };
        cars.unshift(newCar);
        this.setStorageItem(this.STORAGE_KEYS.CARS, cars);
        return newCar;
    },

    getCarById: function(carId) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        return cars.find(car => car.id === carId);
    },

    getCarsBySeller: function(sellerId) {
        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        return cars.filter(car => car.sellerId === sellerId);
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

    getRelatedCars: function(carId, limit = 4) {
        const currentCar = this.getCarById(carId);
        if (!currentCar) return [];

        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        return cars
            .filter(car => car.id !== carId && car.brand === currentCar.brand)
            .slice(0, limit);
    },

    getStorageItem: function(key, defaultValue = null) {
        return MainModule.getStorageItem(key, defaultValue);
    },

    setStorageItem: function(key, value) {
        return MainModule.setStorageItem(key, value);
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
                        <span>${MainModule.formatMileage(car.mileage)}</span>
                        <span class="status-badge ${MainModule.getConditionClass(car.condition)}">${MainModule.getConditionLabel(car.condition)}</span>
                    </div>
                    <div class="car-card-price">
                        ${MainModule.formatPrice(car.price)} <small>万</small>
                    </div>
                </div>
            </div>
        `;
    },

    initAddCarForm: function() {
        const addCarForm = document.getElementById('addCarForm');
        if (addCarForm) {
            const imageInput = document.querySelector('input[name="image"]');
            if (imageInput) {
                imageInput.addEventListener('change', (e) => {
                    this.handleImageUpload(e.target, 'imagePreview');
                });
            }

            addCarForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateCarForm(addCarForm)) {
                    const imageInput = document.querySelector('input[name="image"]');
                    const file = imageInput.files[0];
                    
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const currentUser = ZhangWeiModule.getCurrentUser();
                        const carData = {
                            name: document.querySelector('input[name="name"]').value,
                            brand: document.querySelector('select[name="brand"]').value,
                            year: parseInt(document.querySelector('input[name="year"]').value),
                            mileage: parseInt(document.querySelector('input[name="mileage"]').value),
                            price: parseFloat(document.querySelector('input[name="price"]').value),
                            condition: document.querySelector('select[name="condition"]').value,
                            description: document.querySelector('textarea[name="description"]').value,
                            image: e.target.result,
                            sellerId: currentUser ? currentUser.id : 'guest'
                        };
                        
                        const newCar = this.addCar(carData);
                        alert('Car added successfully!');
                        window.location.href = 'car-detail.html?id=' + newCar.id;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    },

    initCarDetailPage: function() {
        const urlParams = ZhangWeiModule.getUrlParams();
        const carId = urlParams.id;
        if (carId) {
            this.loadCarDetail(carId);
            this.loadRelatedCars(carId);
        }
    },

    loadCarDetail: function(carId) {
        const car = this.getCarById(carId);
        const detailContainer = document.getElementById('carDetail');
        if (detailContainer && car) {
            detailContainer.innerHTML = `
                <div class="detail-header">
                    <div>
                        <img src="${car.image}" alt="${car.name}" class="detail-image">
                    </div>
                    <div class="detail-info">
                        <h1 class="detail-title">${car.name}</h1>
                        <div class="detail-price">${ZhangWeiModule.formatPrice(car.price)} <small>万</small></div>
                        <div class="detail-meta">
                            <div class="detail-meta-item">
                                <span>Brand:</span>
                                <span>${car.brand}</span>
                            </div>
                            <div class="detail-meta-item">
                                <span>Year:</span>
                                <span>${car.year}</span>
                            </div>
                            <div class="detail-meta-item">
                                <span>Mileage:</span>
                                <span>${ZhangWeiModule.formatMileage(car.mileage)}</span>
                            </div>
                            <div class="detail-meta-item">
                                <span>Condition:</span>
                                <span class="status-badge ${ZhangWeiModule.getConditionClass(car.condition)}">${ZhangWeiModule.getConditionLabel(car.condition)}</span>
                            </div>
                        </div>
                        <div class="detail-actions">
                            <button class="btn btn-primary">Contact Seller</button>
                            <button class="btn btn-outline">Save to Favorites</button>
                        </div>
                    </div>
                </div>
                <div class="detail-description">
                    <h3>Description</h3>
                    <p>${car.description}</p>
                </div>
            `;
        }
    },

    loadRelatedCars: function(carId) {
        const relatedCars = this.getRelatedCars(carId);
        const relatedContainer = document.getElementById('relatedCars');
        if (relatedContainer) {
            if (relatedCars.length > 0) {
                relatedContainer.innerHTML = relatedCars.map(car => this.renderCarCard(car)).join('');
            } else {
                relatedContainer.innerHTML = '<p class="no-results">No related cars found</p>';
            }
        }
    },

    init: function() {
        this.initAddCarForm();
        this.initCarDetailPage();
    }
};

// 初始化
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CarModule;
} else {
    window.CarModule = CarModule;
}

document.addEventListener('DOMContentLoaded', function() {
    CarModule.init();
});