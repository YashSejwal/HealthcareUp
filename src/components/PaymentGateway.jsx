import React, { useState } from 'react';

function FrontPage() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (medicine) => {
    setCartItems([...cartItems, medicine]);
  };

  const medicineData = [
    { id: 1, name: 'Medicine 1', price: 10 },
    { id: 2, name: 'Medicine 2', price: 15 },
    { id: 3, name: 'Medicine 3', price: 20 },
    { id: 4, name: 'Medicine 4', price: 12 },
  ];

  return (
    <div>
      <h1>Welcome to the Medicine Store</h1>
      <p>Buy medicines online with ease!</p>

      <div>
        <h2>Medicine List</h2>
        {medicineData.map((medicine) => (
          <div key={medicine.id}>
            <h3>{medicine.name}</h3>
            <p>Price: ${medicine.price}</p>
            <button onClick={() => addToCart(medicine)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FrontPage;
