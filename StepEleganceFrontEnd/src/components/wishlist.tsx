import React from 'react';
import './wishlist.css';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};


const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Running Shoes',
    price: 49.99,
    imageUrl: 'running-shoes.jpg',
  },
  {
    id: 2,
    name: 'Casual Sneakers',
    price: 39.99,
    imageUrl: 'casual-sneakers.jpg',
  },
  {
  id: 3,
    name: 'Casual Sneakers',
    price: 39.99,
    imageUrl: 'casual-sneakers.jpg',
  },
 
];


const ProductItem: React.FC<Product> = ({ name, price, imageUrl }) => (
  <div className="product-item">
    <img src={imageUrl} alt={name} />
    <h3>{name}</h3>
    <p>${price.toFixed(2)}</p>
    <button>Add to Cart</button>
  </div>
);

// Main App component
const wishlist: React.FC = () => (
  <div className="app">
    <h1>Shoe Store</h1>
    <div className="product-list">
      {sampleProducts.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  </div>
);

export default wishlist;
