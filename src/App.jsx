import { useContext } from "react";
import "./App.css";
import Category from "./components/Category";
import Products from "./components/Products";
import { LoginContext } from "./Context/LoginContext";
import Login from "./components/login";
import { Button } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Nav";
import Users from "./components/Users";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/addCategory";
import { useState } from "react";
import ProductsDetails from "./components/ProductsDetails";
import Cart from "./components/Cart";
function App() {
  const { isAuth } = useContext(LoginContext);
  if (!isAuth) return <Login />;
  return (
    <BrowserRouter>
      <SideBar />
      <Nav />
      <div
        style={{
          marginLeft: "clamp(0px, 20vw, 250px)",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category" element={<Category />} />
          <Route path="/users" element={<Users />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
