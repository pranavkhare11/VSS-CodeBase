/**
 * SORTING SYSTEM FOR MYNTRA CLONE
 * ------------------------------
 * This file contains all logic to parse complex strings (like "186.5k" or "Rs. 828 OFF")
 * and sort the product list based on the user's selection.
 */

// --- 1. HELPER FUNCTIONS (PARSERS) ---

/**
 * Converts rating count strings like "168.7k" or "1.5M" into actual numbers.
 */
const parseRatingCount = (countStr) => {
    if (!countStr) return 0;
    if (typeof countStr === 'number') return countStr;

    // Remove commas
    let cleanStr = countStr.toString().replace(/,/g, '');

    if (cleanStr.toLowerCase().includes('k')) {
        return parseFloat(cleanStr) * 1000;
    } else if (cleanStr.toLowerCase().includes('m')) {
        return parseFloat(cleanStr) * 1000000;
    }

    return parseFloat(cleanStr) || 0;
};

/**
 * Calculates the exact discount percentage.
 * Handles both "20% OFF" and "Rs. 828 OFF" formats.
 */
const getDiscountPercentage = (product) => {
    if (!product.discount) return 0;

    const discString = product.discount.toString();

    // Case 1: "20% OFF"
    if (discString.includes('%')) {
        return parseFloat(discString);
    }

    // Case 2: "Rs. 828 OFF" or flat amount
    // We calculate percentage manually: ((MRP - SellingPrice) / MRP) * 100
    if (product.mrp && product.price) {
        return ((product.mrp - product.price) / product.mrp) * 100;
    }

    return 0;
};

/**
 * Calculates a weighted "Recommended" score.
 * Formula: 50% Rating Quality + 30% Popularity + 20% Value (Discount)
 */
const getRecommendedScore = (product) => {
    const count = parseRatingCount(product.ratingCount);
    
    // Logarithmic scale for popularity so 1M views doesn't crush 10k views completely
    // (e.g. log10(100) = 2, log10(100000) = 5)
    const popularityScore = Math.log10(count + 1); 
    const ratingScore = product.rating || 0;
    const valueScore = getDiscountPercentage(product) / 10; // Scale 0-100 down to 0-10

    // Weights
    const W_RATING = 0.5;
    const W_POPULARITY = 0.3;
    const W_VALUE = 0.2;

    // Multiply rating by 2 to map 0-5 stars to roughly 0-10 scale like the others
    return (ratingScore * 2 * W_RATING) + 
           (popularityScore * W_POPULARITY) + 
           (valueScore * W_VALUE);
};


// --- 2. MAIN SORT FUNCTION ---

/**
 * Sorts the product list based on the selected criteria.
 * @param {Array} productList - The array of product objects
 * @param {String} sortType - The text from the UI option (e.g., "Price: High to Low")
 * @returns {Array} - A new sorted array
 */
function sortProducts(productList, sortType) {
    // Create a shallow copy to avoid mutating the original array directly
    let sortedList = [...productList];

    switch (sortType) {
        case "Price: High to Low":
            sortedList.sort((a, b) => b.price - a.price);
            break;

        case "Price: Low to High":
            sortedList.sort((a, b) => a.price - b.price);
            break;

        case "Customer Rating":
            sortedList.sort((a, b) => b.rating - a.rating);
            break;

        case "Better Discount":
            sortedList.sort((a, b) => getDiscountPercentage(b) - getDiscountPercentage(a));
            break;

        case "Popularity":
            sortedList.sort((a, b) => parseRatingCount(b.ratingCount) - parseRatingCount(a.ratingCount));
            break;

        case "What's New":
            // Sort by date (Newest first)
            sortedList.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;

        case "Recommended":
        default:
            // Default to Recommended logic
            sortedList.sort((a, b) => getRecommendedScore(b) - getRecommendedScore(a));
            break;
    }

    return sortedList;
}

// Export for usage if using modules, otherwise it attaches to window/global scope
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sortProducts };
}