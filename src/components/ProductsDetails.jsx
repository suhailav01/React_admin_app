import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";

export default function ProductsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAdd = () => {
    addToCart(product);
    navigate("/cart");
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 12,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          background: "linear-gradient(180deg, #e9fdf5, #ffffff)",
          maxWidth: 900,
          display: "flex",
          flexWrap: "wrap",
          p: 3,
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        {/* IMAGE */}
        <Box
          sx={{
            flex: "1 1 300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f5f5f5",
            borderRadius: 3,
            p: 3,
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              width: 220,
              height: 320,
              objectFit: "contain",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Box>

        {/* DETAILS */}
        <CardContent sx={{ flex: "1 1 400px", ml: { md: 3 } }}>
          <Typography variant="h5" fontWeight="bold">
            {product.title}
          </Typography>

          <Typography sx={{ color: "text.secondary", mt: 2, lineHeight: 1.6 }}>
            {product.description}
          </Typography>

          <Chip
            label={product.category}
            color="primary"
            variant="outlined"
            sx={{ mt: 2 }}
          />

          <Typography
            variant="h4"
            sx={{ mt: 2, color: "success.main", fontWeight: "bold" }}
          >
            ${product.price}
          </Typography>

          <Button
            fullWidth
            size="large"
            sx={{
              mt: 3,
              bgcolor: "success.main",
              color: "white",
              borderRadius: 3,
              py: 1.2,
              fontSize: "16px",
              "&:hover": {
                bgcolor: "success.dark",
              },
            }}
            onClick={handleAdd}
          >
            🛒 Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
