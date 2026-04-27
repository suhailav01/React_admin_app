import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  /////////////////////////////////////////////////////////////

  const loadProducts = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      setProducts(data);
      if (!response.ok) {
        console.log("failed fetched");
      }
    } catch (error) {
      console.log("error in fetch", error);
    }
  };
  /////////////////////////////////////////////////////////////
  const addProducts = async (newProduct) => {
    try {
      setProducts((prev) => [newProduct, ...prev]);
      const response = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      console.log("Product saved to API:", data);
    } catch (error) {
      console.error("Failed to save product to API:", error);
    }
  };

  /////////////////////////////////////////////////////////////
  const deleteProduct = async (id) => {
    try {
      await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: "DELETE",
      });
      loadProducts();
    } catch (error) {
      console.log("error in deleting", error);
    }
  };
  /////////////////////////////////////////////////////////////
  const updateProduct = async (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();
      console.log("Updated:", data);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        deleteProduct,
        addProducts,
        updateProduct,
        loadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
