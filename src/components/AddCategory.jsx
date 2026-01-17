import React, { useContext, useState } from "react";
import { CategoryContext } from "../Context/CategoryContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import CategoryIcon from "@mui/icons-material/Category";
import LinkIcon from "@mui/icons-material/Link";
export default function AddCategory() {
  const Navigate = useNavigate();
  const { addCategory } = useContext(CategoryContext);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleAdd = () => {
    if (!form.name || !form.slug || !form.image) return;

    const newCategory = {
      name: form.name,
      slug: form.slug,
      images: [form.image],
    };
    addCategory(newCategory);
    setForm({ name: "", slug: "", image: "" });
    Navigate("/category");
  };
  const isDisabled = !form.name || !form.slug || !form.image;
  return (
    <Box
      sx={{ marginRight: "150px" }}
      display="flex"
      justifyContent="center"
      mt={20}
    >
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
           Add New Category
        </Typography>

        <TextField
          fullWidth
          label="Category name"
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CategoryIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="slug"
          name="slug"
          type="text"
          value={form.slug}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon color="success" />
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
