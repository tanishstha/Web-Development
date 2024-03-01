
import React from 'react';

interface ShoppingCartProps {
  items: { id: number; name: string; price: number }[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
