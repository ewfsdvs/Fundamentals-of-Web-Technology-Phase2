function loadFeaturedCars() {
    const featuredCars = [
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
        }
    ];
    
    const container = document.getElementById('featuredCars');
    if (container) {
        container.innerHTML = featuredCars.map(car => `
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
    }
}

function performHeroSearch() {
    const keyword = document.getElementById('heroSearchInput').value.trim();
    if (keyword) {
        window.location.href = `search.html?keyword=${encodeURIComponent(keyword)}`;
    } else {
        window.location.href = 'search.html';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedCars();
    
    // Add event listener for search button
    const searchBtn = document.querySelector('.search-box button');
    if (searchBtn) {
        searchBtn.addEventListener('click', performHeroSearch);
    }
    
    // Add event listener for enter key in search input
    const searchInput = document.getElementById('heroSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performHeroSearch();
            }
        });
    }
});