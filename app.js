// Phase 1 - Member 3 (王强) - Car Management JS

// Car form validation
function validateCarForm() {
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
}

// Load car details
function loadCarDetails() {
    // Mock car data for phase 1
    const car = {
        id: 'car_001',
        name: 'BMW 3 Series 320i',
        brand: 'BMW',
        year: 2022,
        mileage: 15000,
        price: 28.5,
        condition: 'excellent',
        description: 'Excellent condition, low mileage, full service history. Leather seats, sunroof, parking sensors. This BMW 3 Series 320i is a perfect combination of luxury and performance. It features a smooth automatic transmission, responsive handling, and a comfortable interior. Ideal for both daily commuting and weekend getaways.'
    };

    const container = document.getElementById('carDetailContainer');
    if (container) {
        container.innerHTML = `
            <div class="car-detail-container">
                <div class="car-image">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzI1NjNlYiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+Qk1XPC90ZXh0Pjwvc3ZnPg==" alt="${car.name}">
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
                            <span class="meta-value">${car.mileage.toLocaleString()} km</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Condition</span>
                            <span class="status-badge excellent">${car.condition}</span>
                        </div>
                    </div>
                    <div class="car-price">¥${car.price} 万</div>
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
    }

    // Load related cars
    loadRelatedCars();
}

// Load related cars
function loadRelatedCars() {
    const relatedCars = [
        {
            id: 'car_002',
            name: 'Mercedes-Benz C-Class C200',
            brand: 'Mercedes-Benz',
            year: 2021,
            mileage: 25000,
            price: 32.0,
            condition: 'good'
        },
        {
            id: 'car_003',
            name: 'Audi A4 40 TFSI',
            brand: 'Audi',
            year: 2023,
            mileage: 8000,
            price: 35.8,
            condition: 'excellent'
        }
    ];

    const container = document.getElementById('relatedCars');
    if (container) {
        container.innerHTML = relatedCars.map(car => `
            <div class="car-card">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzY0NzQ4YiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+TVQ8L3RleHQ+PC9zdmc+" alt="${car.name}" class="car-card-image">
                <div class="car-card-content">
                    <h3 class="car-card-title">${car.name}</h3>
                    <div class="car-card-info">
                        <span>${car.brand}</span>
                        <span>${car.year}</span>
                        <span>${car.mileage.toLocaleString()} km</span>
                        <span>${car.condition}</span>
                    </div>
                    <div class="car-card-price">
                        ¥${car.price} 万
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add car form submission
    const addCarForm = document.getElementById('addCarForm');
    if (addCarForm) {
        addCarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateCarForm()) {
                alert('Car listed successfully!');
                window.location.href = 'index.html';
            }
        });
    }

    // Load car details if on car detail page
    if (window.location.pathname.includes('car-detail.html')) {
        loadCarDetails();
    }
});