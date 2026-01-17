import React, { useContext } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { ProductContext } from "../Context/ProductsContext";
import { SearchContext } from "../Context/SearchContext";
import { Link } from "react-router-dom";
export default function Users() {
  const { products } = useContext(ProductContext);
  const { search, setSearch } = useContext(SearchContext);
  const filterProd = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Box
      sx={{
        mb: 10,
        mt: 15,
        background: "linear-gradient(180deg, #e9fdf5, #ffffff)",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {filterProd.map((p) => (
          <Grid item xs={12} sm={6} md={3} lg={4} key={p.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "230px",
                height: 350,
                borderRadius: 3,
                boxShadow: 3,
                transition: "all 0.3s ease",
                background: "linear-gradient(180deg, #e9fdf5, #ffffff)",

                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardMedia
                component="img"
                image={p.image}
                alt={p.title}
                sx={{
                  height: 100,
                  width: 100,
                  objectFit: "contain",
                  p: 2,
                }}
              />

              <CardContent sx={{ textAlign: "center", lineHeight: "15px" }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {p.title.slice(0, 20)}
                </Typography>
                <Typography variant="h6" color="green" fontWeight="bold">
                  ₹ {p.price}
                </Typography>
                <Typography variant="h6" color="warning" fontWeight="bold">
                  ⭐⭐⭐⭐☆{p.rating.rate}
                </Typography>
                <Typography
                  sx={{
                    // border: "1px solid silver",
                    borderRadius: "20px",
                    marginTop: "15px",
                  }}
                  variant="h6"
                  color="dark"
                  fontSize={15}
                >
                  {p.category}
                </Typography>
                <Link to={`/products/${p.id}`}>
                  <Button
                    sx={{
                      backgroundColor: "orange",
                      width:"180px",
                      color: "black",
                      padding: "3px",
                      marginTop:"10px",
                      borderRadius:"20px"
                    }}
                  >
                    for details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
