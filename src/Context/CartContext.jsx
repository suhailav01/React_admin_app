import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);
  //////////////////////////////////////////////////////////////////////////
  const addToCart = (product) => {
    setCartItem((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
  };
  //////////////////////////////////////////////////////////////////////////
  const removeItem = (id) => {
    setCartItem((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  ////////////////////////////////////////////////////////////////////////
  const increment = (id) => {
    setCartItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  /////////////////////////////////////////////////////////////////////////
  const decrement = (id) => {
    setCartItem((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  /////////////////////////////////////////////////////////////////////////
  const placeOrder = () => {
    if (cartItem.length === 0) {
      alert("no item in cart");
      return;
    }
  };
  return (
    <div>
      <CartContext.Provider
        value={{ addToCart, cartItem, removeItem, increment, decrement }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}
