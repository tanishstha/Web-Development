// App.tsx
import React, { useState } from 'react';
// import Product from '..components/pro';
// import ShoppingCart from './c';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number }[]>([]);

  const addToCart = (id: number) => {
    // Simulated fetching of product details
    const product = {
      id,
      name: `Product ${id}`,
      price: Math.floor(Math.random() * 100) + 1, // Random price for demonstration
    };
    setCartItems([...cartItems, product]);
  };

  return (
    <div>
      <h1>Online Store</h1>
      <div>
        <h2>Products</h2>
        <Product id={1} name="Product 1" price={10} onAddToCart={addToCart} />
        <Product id={2} name="Product 2" price={20} onAddToCart={addToCart} />
        {/* Add more products as needed */}
      </div>
      <ShoppingCart items={cartItems} />
    </div>
  );
}

export default App;
