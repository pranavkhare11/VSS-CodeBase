

// Hamburger Menu for Mobile/Tablet Filters
const filterHamburger = document.getElementById('filter-hamburger');
const filtersSidebar = document.getElementById('filters-sidebar');
const filterOverlay = document.getElementById('filter-overlay');
const closeFilters = document.getElementById('close-filters');

function openFilters() {
    if (filtersSidebar) filtersSidebar.classList.add('active');
    if (filterOverlay) filterOverlay.classList.add('active');
    if (filterHamburger) filterHamburger.classList.add('hidden');
    document.body.style.overflow = 'hidden';
}

function closeFiltersMenu() {
    if (filtersSidebar) filtersSidebar.classList.remove('active');
    if (filterOverlay) filterOverlay.classList.remove('active');
    if (filterHamburger) filterHamburger.classList.remove('hidden');
    document.body.style.overflow = '';
}

if (filterHamburger) {
    filterHamburger.addEventListener('click', openFilters);
}

if (closeFilters) {
    closeFilters.addEventListener('click', closeFiltersMenu);
}

if (filterOverlay) {
    filterOverlay.addEventListener('click', closeFiltersMenu);
}

// Close filter menu on window resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        closeFiltersMenu();
    }
});

let rangeMin = 100; // Will be updated based on product prices
const range = document.querySelector(".range-selected");
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".range-price input");

function updateRangeDisplay(minRange, maxRange) {
    const maxValue = parseInt(rangeInput[1].max);
    const minValue = parseInt(rangeInput[0].min);
    const minPercent = ((minRange - minValue) / (maxValue - minValue)) * 100;
    const maxPercent = ((maxRange - minValue) / (maxValue - minValue)) * 100;

    // Calculate thumb width as percentage of track
    const thumbSize = 14;
    const trackWidth = rangeInput[0].offsetWidth;
    const thumbWidthPercent = (thumbSize / trackWidth) * 100;

    rangePrice[0].value = minRange;
    rangePrice[1].value = maxRange;
    range.style.left = minPercent + "%";
    range.style.right = (100 - maxPercent) + "%";
}

rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minRange = parseInt(rangeInput[0].value);
        let maxRange = parseInt(rangeInput[1].value);
        if (maxRange - minRange < rangeMin) {
            if (e.target.className === "min") {
                rangeInput[0].value = maxRange - rangeMin;
                minRange = parseInt(rangeInput[0].value);
            } else {
                rangeInput[1].value = minRange + rangeMin;
                maxRange = parseInt(rangeInput[1].value);
            }
        }
        updateRangeDisplay(minRange, maxRange);
    });
});

rangePrice.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minPrice = rangePrice[0].value;
        let maxPrice = rangePrice[1].value;
        if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "min") {
                rangeInput[0].value = minPrice;
                updateRangeDisplay(parseInt(minPrice), parseInt(rangeInput[1].value));
            } else {
                rangeInput[1].value = maxPrice;
                updateRangeDisplay(parseInt(rangeInput[0].value), parseInt(maxPrice));
            }
        }
    });
});

// Logic to toggle Radio Buttons (Uncheck if clicked again)
function toggleRadio(e, id) {
    const radio = document.getElementById(id);
    if (radio.checked) {
        e.preventDefault(); // Stop the browser from keeping it checked
        radio.checked = false; // Manually uncheck
    }
}

const container = document.getElementById("products-container");
const sortLabel = document.querySelector(".sort-label strong");
const sortOptions = document.querySelectorAll(".sort-option");

// Pagination state
const PRODUCTS_PER_PAGE = 32;
let currentPage = 1;
window.filteredProducts = [];

// Generate brand options dynamically from products
const brandCounts = {};
products.forEach((p) => {
    brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
});

// Sort brands by frequency (most products first)
const uniqueBrands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([brand]) => brand);

const brandFilterContainer = document.getElementById("brand-filter-container");
const brandMap = {};
let brandCheckboxes = [];
const checkedBrands = new Set(); // Track checked brands across renders

const SHOW_PER_PAGE = 12; // Show top 12 brands initially
let showAllBrands = false;

const createBrandCheckbox = (brand, index) => {
    const id = `brand-${index}`;
    brandMap[id] = brand;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.checked = checkedBrands.has(brand); // Restore checked state

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = brand;

    const br = document.createElement("br");

    return { checkbox, label, br };
};

const renderBrands = () => {
    brandFilterContainer.innerHTML = ""; // Clear existing
    brandCheckboxes = [];

    const brandsToShow = showAllBrands ? uniqueBrands : uniqueBrands.slice(0, SHOW_PER_PAGE);

    brandsToShow.forEach((brand, index) => {
        const { checkbox, label, br } = createBrandCheckbox(brand, uniqueBrands.indexOf(brand));

        brandFilterContainer.appendChild(checkbox);
        brandFilterContainer.appendChild(label);
        brandFilterContainer.appendChild(br);

        brandCheckboxes.push(checkbox);
        checkbox.addEventListener("change", (e) => {
            // Update checkedBrands set
            if (e.target.checked) {
                checkedBrands.add(brand);
            } else {
                checkedBrands.delete(brand);
            }
            applyFiltersAndSort();
        });
    });

    // Add "more" button if not all brands are shown
    if (!showAllBrands && uniqueBrands.length > SHOW_PER_PAGE) {
        const moreSpan = document.createElement("span");
        moreSpan.className = "pink-more";
        moreSpan.style.cursor = "pointer";
        moreSpan.textContent = `+${uniqueBrands.length - SHOW_PER_PAGE} more`;
        moreSpan.addEventListener("click", () => {
            showAllBrands = true;
            renderBrands();
        });
        brandFilterContainer.appendChild(moreSpan);
    }
};

renderBrands();

// Get categories and colors from both existing HTML and product data
const uniqueCategories = [...new Set(products.map((p) => p.category))];
const uniqueColors = [...new Set(products.map((p) => p.color))];

const categoryMap = {};
const categoryCheckboxes = [];
uniqueCategories.forEach((category) => {
    const id = category.toLowerCase();
    const checkbox = document.getElementById(id);
    if (checkbox) {
        categoryMap[id] = category;
        categoryCheckboxes.push(checkbox);
    }
});

const colorMap = {};
const colorCheckboxes = [];
uniqueColors.forEach((color) => {
    const id = `${color.toLowerCase()}-color`;
    const checkbox = document.getElementById(id);
    if (checkbox) {
        colorMap[id] = color;
        colorCheckboxes.push(checkbox);
    }
});

// Debug: Log product count per color
const colorCounts = {};
products.forEach((p) => {
    colorCounts[p.color] = (colorCounts[p.color] || 0) + 1;
});
console.log("Total products:", products.length);
console.log("Products per color:", colorCounts);
console.log("Unique colors from products:", uniqueColors);
console.log("Color checkboxes found:", colorCheckboxes.length);
const discountRadios = document.querySelectorAll("input[name='discount']");
const resetFiltersBtn = document.querySelector(".reset-filters-btn");

// Calculate actual min/max prices from products
const productPrices = products.map((p) => p.price);
const actualMinPrice = Math.min(...productPrices);
const actualMaxPrice = Math.max(...productPrices);

// Set range input min/max to actual product prices for display
rangeInput[0].min = actualMinPrice;
rangeInput[0].max = actualMaxPrice;
rangeInput[1].min = actualMinPrice;
rangeInput[1].max = actualMaxPrice;
rangeInput[0].value = actualMinPrice;
rangeInput[1].value = actualMaxPrice;

// Update number inputs
rangePrice[0].value = actualMinPrice;
rangePrice[1].value = actualMaxPrice;
rangePrice[0].min = actualMinPrice;
rangePrice[1].max = actualMaxPrice;

// Use 0 and infinity as default filter range so all products pass through initially
const initialMinPrice = 0;
const initialMaxPrice = Infinity;
const sizeCheckboxes = document.querySelectorAll(".dropdown-size input[type='checkbox']");

// Update rangeMin to be reasonable based on product prices
rangeMin = Math.max(50, Math.floor((actualMaxPrice - actualMinPrice) / 100));

// Initialize range display with actual values
updateRangeDisplay(actualMinPrice, actualMaxPrice);
const getSelectedBrands = () => {
    return brandCheckboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => brandMap[checkbox.id]);
};

const getSelectedCategories = () => {
    return categoryCheckboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => categoryMap[checkbox.id]);
};

const getSelectedColors = () => {
    return colorCheckboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => colorMap[checkbox.id]);
};

const getSelectedSizes = () => {
    return Array.from(sizeCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.nextElementSibling.textContent.trim());
};

const parseDiscountPercent = (discountStr) => {
    if (!discountStr) return 0;
    const match = discountStr.match(/(\d+)%/);
    return match ? Number(match[1]) : 0;
};

const getMinDiscount = () => {
    const checkedRadio = Array.from(discountRadios).find((radio) => radio.checked);
    if (!checkedRadio) return 0;
    return parseInt(checkedRadio.value);
};

const renderProducts = (list) => {
    // Store full list for pagination
    window.filteredProducts = list;

    // Calculate pagination
    const totalProducts = list.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    // Get products for current page
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const productsToShow = list.slice(startIndex, endIndex);

    container.innerHTML = productsToShow.map((p) => `
        <div class="product-card">
            <div class="image-section">
                <img class="product-image" src="${p.img}" alt="${p.name}">

                <div class="wishlist-overlay">
                    <div class="wishlist-section">
                        <div class="myntra-sprite icon-wishlist-overlay"></div>
                        <span>WISHLIST</span>
                    </div>
                    <div class="size-container">Sizes: ${p.size}</div>
                </div>

                <div class="ratings-container">
                    <div class="rating-value">${p.rating}</div>
                    <div class="icon-box-rating">
                        <div class="myntra-sprite icon-rating"></div>
                    </div>
                    <div> | </div>
                    <div class="ratings-count">${p.ratingCount}</div>
                </div>
            </div>

            <div class="details-section">
                <div class="product-brand">${p.brand}</div>
                <div class="product-name">${p.name}</div>
            </div>

            <div class="product-pricing">
                ${p.discount ? `
                <span class="product-discounted-price">Rs.${p.price}</span>
                ${p.mrp ? `<span class="product-original-price">Rs.${p.mrp}</span>` : ""}
                <span class="product-discount-percentage">${p.discount}</span>
                ` : `
                <span class="product-discounted-price">Rs.${p.price}</span>
                `}
            </div>
        </div>
    `).join("");

    // Update page counter display
    const pageCounter = document.querySelector(".current-total-page");
    if (pageCounter) {
        pageCounter.textContent = `page ${currentPage} of ${totalPages}`;
    }

    // Update button states
    const prevButton = document.querySelector(".previous-page-button");
    const nextButton = document.querySelector(".next-page-button");
    const page1Button = document.querySelector(".page-1-button");

    if (prevButton) prevButton.style.opacity = currentPage === 1 ? "0.5" : "1";
    if (page1Button) page1Button.style.opacity = currentPage === 1 ? "0.5" : "1";
    if (nextButton) nextButton.style.opacity = currentPage === totalPages ? "0.5" : "1";

    // Scroll to top of products
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

let currentSortType = "Recommended";

const applyFiltersAndSort = () => {
    // Reset to page 1 when filters change
    currentPage = 1;

    const selectedBrands = getSelectedBrands();
    const selectedCategories = getSelectedCategories();
    const selectedColors = getSelectedColors();
    const selectedSizes = getSelectedSizes();
    const minDiscount = getMinDiscount();
    const minPrice = parseInt(rangeInput[0].value);
    const maxPrice = parseInt(rangeInput[1].value);

    let filtered = products.filter((product) => {
        if (selectedBrands.length && !selectedBrands.includes(product.brand)) {
            return false;
        }
        if (selectedCategories.length && !selectedCategories.includes(product.category)) {
            return false;
        }
        if (selectedColors.length && !selectedColors.includes(product.color)) {
            return false;
        }
        if (selectedSizes.length && !selectedSizes.includes(product.size)) {
            return false;
        }
        if (product.price < minPrice || product.price > maxPrice) {
            return false;
        }
        if (minDiscount && parseDiscountPercent(product.discount) < minDiscount) {
            return false;
        }
        return true;
    });

    filtered = sortProducts(filtered, currentSortType);

    // Debug: Show filtering is working on all products
    console.log(`Filtered ${filtered.length} products out of ${products.length} total products`);

    renderProducts(filtered);

    const hasFilters =
        selectedBrands.length ||
        selectedCategories.length ||
        selectedColors.length ||
        selectedSizes.length ||
        minDiscount > 0 ||
        minPrice !== actualMinPrice ||
        maxPrice !== actualMaxPrice;

    if (resetFiltersBtn) {
        resetFiltersBtn.classList.toggle("is-visible", hasFilters);
    }
};

const resetFilters = () => {
    // Reset brand selection
    checkedBrands.clear();
    showAllBrands = false;
    renderBrands();

    categoryCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    colorCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    sizeCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    discountRadios.forEach((radio) => (radio.checked = false));

    rangeInput[0].value = actualMinPrice;
    rangeInput[1].value = actualMaxPrice;
    updateRangeDisplay(parseInt(rangeInput[0].value), parseInt(rangeInput[1].value));

    applyFiltersAndSort();
};

sortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        const sortType = option.textContent.trim();
        sortOptions.forEach((item) => item.classList.remove("selected"));
        option.classList.add("selected");
        sortLabel.textContent = sortType;
        currentSortType = sortType;
        applyFiltersAndSort();
    });
});

categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFiltersAndSort);
});

colorCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFiltersAndSort);
});

sizeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFiltersAndSort);
});

discountRadios.forEach((radio) => {
    radio.addEventListener("change", applyFiltersAndSort);
});

rangeInput.forEach((input) => {
    input.addEventListener("change", applyFiltersAndSort);
});

rangePrice.forEach((input) => {
    input.addEventListener("change", applyFiltersAndSort);
});

if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetFilters);
}

// Pagination button event listeners
const page1Button = document.querySelector(".page-1-button");
const prevButton = document.querySelector(".previous-page-button");
const nextButton = document.querySelector(".next-page-button");

if (page1Button) {
    page1Button.addEventListener("click", () => {
        if (currentPage !== 1) {
            currentPage = 1;
            renderProducts(window.filteredProducts);
        }
    });
}

if (prevButton) {
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts(window.filteredProducts);
        }
    });
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        const totalPages = Math.ceil(window.filteredProducts.length / PRODUCTS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts(window.filteredProducts);
        }
    });
}

applyFiltersAndSort();