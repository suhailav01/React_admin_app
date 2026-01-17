import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();

export default function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  ////////////////////////////////////////////////////////////////////
  const loadCategories = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories");
    const data = await response.json();
    setCategories(data);
  };
  //////////////////////////////////////////////////////////////
  const deleteCategory = async (id) => {
    // ✅ REMOVE FROM UI FIRST
    setCategories((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Delete failed");
    }
  };
  ///////////////////////////////////////////////////
  const updateCategory = async (id, updatedData) => {
    // ✅ update UI immediately
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData), // ✅ send name
        }
      );

      const data = await response.json();
      console.log("Updated:", data);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  ////////////////////////////////////////////////////
  const addCategory = async (newCategory) => {
    try {
      setCategories((prev) => [newCategory, ...prev]);
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  /////////////////////////////////////////////////

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, deleteCategory, updateCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
