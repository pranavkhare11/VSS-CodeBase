// 1. DATA SOURCES
const brands = [
  "Roadster",
  "Puma",
  "HRX by Hrithik Roshan",
  "Nike",
  "Adidas",
  "WROGN",
  "U.S. Polo Assn.",
  "Levis",
  "Jack & Jones",
  "Tommy Hilfiger",
  "Here&Now",
  "Flying Machine",
  "Moda Rapido",
  "HIGHLANDER",
  "Mast & Harbour",
];

const styles = [
  "Printed Round Neck T-shirt",
  "Solid Polo Collar T-shirt",
  "Striped Slim Fit T-shirt",
  "Typography Print T-shirt",
  "Colourblocked T-shirt",
  "Graphic Print T-shirt",
  "Pure Cotton T-shirt",
  "Slim Fit V-Neck T-shirt",
  "Oversized Cotton Tee",
  "Colorblock Raglan Tee",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

// High-quality Unsplash Image IDs for T-shirts
const imageIds = [
  "1521572163474-6864f9cf17ab",
  "1583743814966-8936f5b7be1a",
  "1562157879907-a9a426e6dec3",
  "1529374255404-311a2a4f1bc9",
  "1576566588028-4147f3842f27",
  "1503341455253-b2e72333dbdb",
  "1581655353564-df123a1eb820",
  "1523381210434-271e8be1f52b",
  "1618354691373-d851c5c3a990",
  "1606107557195-0e29a4b5b4aa",
  "1525171254930-643fc658b64e",
  "1586363104862-3a5e62dd418c",
  "1564859228273-274232fdb516",
  "1574180566232-aaad1b5b8450",
  "1512436991641-6745cdb1723f",
];

// 2. GENERATE 60 PRODUCTS
const productList = [];

for (let i = 0; i < 60; i++) {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const style = styles[Math.floor(Math.random() * styles.length)];
  const imgId = imageIds[Math.floor(Math.random() * imageIds.length)];
  const size = sizes[Math.floor(Math.random() * sizes.length)]; // Single Random Size

  // Random pricing logic
  const price = Math.floor(Math.random() * (10000 - 99) + 99);
  const discount = Math.floor(Math.random() * (80 - 10) + 10);
  const sellingPrice = Math.floor(price - price * (discount / 100));

  // Random rating
  const rating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
  const count = (Math.random() * (9.0 - 0.5) + 0.5).toFixed(1) + "k";

  productList.push({
    brand: brand,
    name: style,
    price: price,
    sellingPrice: sellingPrice,
    discount: discount,
    rating: rating,
    ratingCount: count,
    size: size, // Added single size to data
    image: `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&w=210&q=80`,
  });
}
