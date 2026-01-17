import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductProvider from "./Context/ProductsContext.jsx";
import CategoryProvider from "./Context/CategoryContext.jsx";
import LoginProvider from "./Context/LoginContext.jsx";
import SearchContextProvider from "./Context/SearchContext.jsx";
import CartProvider from "./Context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <LoginProvider>
    <ProductProvider>
      <CategoryProvider>
        <SearchContextProvider>
          <CartProvider>
          <App />
          </CartProvider>
        </SearchContextProvider>
      </CategoryProvider>
    </ProductProvider>
  </LoginProvider>
);
