// 搜索功能模块
const SearchModule = {
    STORAGE_KEYS: {
        CARS: 'used_car_cars'
    },

    currentPage: 1,
    itemsPerPage: 6,
    sortedCars: [],

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
        cars = this.sortCars(cars, this.getSortBy());
        this.sortedCars = cars;
        this.renderCars(cars);
        this.renderPagination(cars.length);
        this.updateResultsCount(cars.length);
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
                <button class="page-btn ${i === this.currentPage ? 'active' : ''}" onclick="SearchModule.goToPage(${i})">
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
        const criteria = {};
        
        const keywordInput = document.getElementById('keyword');
        if (keywordInput) {
            criteria.keyword = keywordInput.value.trim();
        }
        
        const brandSelect = document.getElementById('brand');
        if (brandSelect) {
            criteria.brand = brandSelect.value;
        }
        
        const minPriceInput = document.getElementById('minPrice');
        if (minPriceInput) {
            criteria.minPrice = minPriceInput.value;
        }
        
        const maxPriceInput = document.getElementById('maxPrice');
        if (maxPriceInput) {
            criteria.maxPrice = maxPriceInput.value;
        }
        
        const yearSelect = document.getElementById('year');
        if (yearSelect) {
            criteria.year = yearSelect.value;
        }
        
        const conditionSelect = document.getElementById('condition');
        if (conditionSelect) {
            criteria.condition = conditionSelect.value;
        }
        
        return criteria;
    },

    getSortBy: function() {
        const sortSelect = document.getElementById('sortBy');
        return sortSelect ? sortSelect.value : 'price-asc';
    },

    updateResultsCount: function(count) {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `Found ${count} car${count !== 1 ? 's' : ''}`;
        }
    },

    showSearchSuggestions: function(keyword) {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (!suggestionsContainer || !keyword) {
            if (suggestionsContainer) {
                suggestionsContainer.style.display = 'none';
            }
            return;
        }

        const cars = this.getStorageItem(this.STORAGE_KEYS.CARS, []);
        const suggestions = cars
            .filter(car => car.name.toLowerCase().includes(keyword.toLowerCase()) || car.brand.toLowerCase().includes(keyword.toLowerCase()))
            .slice(0, 5);

        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(car => `
                <div class="search-suggestion" onclick="SearchModule.selectSuggestion('${car.name}')">
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
        const keywordInput = document.getElementById('keyword');
        if (keywordInput) {
            keywordInput.value = name;
        }
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    },

    getStorageItem: function(key, defaultValue = null) {
        return MainModule.getStorageItem(key, defaultValue);
    },

    initSearchForm: function() {
        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.currentPage = 1;
                this.loadCars();
            });
        }
    },

    initSortFunctionality: function() {
        const sortSelect = document.getElementById('sortBy');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                this.currentPage = 1;
                this.loadCars();
            });
        }
    },

    initSearchSuggestions: function() {
        const keywordInput = document.getElementById('keyword');
        if (keywordInput) {
            keywordInput.addEventListener('input', MainModule.debounce((e) => {
                this.showSearchSuggestions(e.target.value);
            }, 300));

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    const suggestionsContainer = document.getElementById('searchSuggestions');
                    if (suggestionsContainer) {
                        suggestionsContainer.style.display = 'none';
                    }
                }
            });
        }
    },

    init: function() {
        this.initSearchForm();
        this.initSortFunctionality();
        this.initSearchSuggestions();
        this.loadCars();
    }
};

// 初始化
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchModule;
} else {
    window.SearchModule = SearchModule;
}

document.addEventListener('DOMContentLoaded', function() {
    SearchModule.init();
});