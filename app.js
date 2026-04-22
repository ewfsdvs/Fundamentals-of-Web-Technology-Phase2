// Phase 1 - Member 4 (陈明) - Search Functionality JS

// Mock car data for phase 1
const mockCars = [
    {
        id: 'car_001',
        name: 'BMW 3 Series 320i',
        brand: 'BMW',
        year: 2022,
        mileage: 15000,
        price: 28.5,
        condition: 'excellent'
    },
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
    },
    {
        id: 'car_004',
        name: 'Toyota Camry 2.5L',
        brand: 'Toyota',
        year: 2020,
        mileage: 45000,
        price: 18.5,
        condition: 'good'
    },
    {
        id: 'car_005',
        name: 'Honda Civic 1.5T',
        brand: 'Honda',
        year: 2022,
        mileage: 20000,
        price: 16.8,
        condition: 'excellent'
    },
    {
        id: 'car_006',
        name: 'Tesla Model 3 Standard Range',
        brand: 'Tesla',
        year: 2023,
        mileage: 5000,
        price: 25.9,
        condition: 'excellent'
    }
];

// Render cars to the grid
function renderCars(cars) {
    const container = document.getElementById('carGrid');
    if (container) {
        if (cars.length > 0) {
            container.innerHTML = cars.map(car => `
                <div class="car-card">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzI1NjNlYiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+Qk1XPC90ZXh0Pjwvc3ZnPg==" alt="${car.name}" class="car-card-image">
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
        } else {
            container.innerHTML = '<div class="no-results">No cars found matching your criteria</div>';
        }
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Render mock cars on page load
    renderCars(mockCars);

    // Search form submission
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Search functionality will be implemented in phase 2');
        });
    }

    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            alert('Sort functionality will be implemented in phase 2');
        });
    }

    // Pagination functionality
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Pagination functionality will be implemented in phase 2');
        });
    });
});