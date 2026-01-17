import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TitleIcon from "@mui/icons-material/Title";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ImageIcon from "@mui/icons-material/Image";
import { ProductContext } from "../Context/ProductsContext";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProducts } = useContext(ProductContext);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.title || !form.price || !form.image) return;

    const newProduct = {
      title: form.title,
      price: Number(form.price),
      image: [form.image],
      categoryId: 1,
      description: "Custom added product",
    };

    addProducts(newProduct);
    setForm({ title: "", price: "", image: "" });
    navigate("/products");
  };

  const isDisabled = !form.title || !form.price || !form.image;

  return (
    <Box sx={{marginRight:"150px"}} display="flex" justifyContent="center" mt={20}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 420,
          borderRadius: 4,
          background: "linear-gradient(180deg, #e9fdf5, #ffffff)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          ➕ Add New Product
        </Typography>

        <TextField
          fullWidth
          label="Product Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRupeeIcon color="success" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ImageIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          disabled={isDisabled}
          onClick={handleAdd}
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 3,
            fontWeight: "bold",
            textTransform: "none",
            transition: "0.3s",
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            },
          }}
        >
          Add Product
        </Button>
      </Paper>
    </Box>
  );
}
