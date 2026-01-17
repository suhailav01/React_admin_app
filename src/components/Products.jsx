import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  IconButton,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ProductContext } from "../Context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";

function Products() {
  const Navigate = useNavigate();
  const { search, setSearch } = useContext(SearchContext);
  const { products, updateProduct, deleteProduct } = useContext(ProductContext);
  const filterProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  const [editOpen, setEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: null,
    title: "",
    price: "",
  });

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEditOpen = (product) => {
    setEditProduct({
      id: product.id,
      title: product.title,
      price: product.price,
    });
    setEditOpen(true);
  };

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = () => {
    deleteProduct(selectedId);
    handleClose();
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 950,
        mx: "auto",
        mt: { xs: 13, md: 13 },
        p: { xs: 2, sm: 3 },
        mr: { lg: "50px", xs: "100px" },
        borderRadius: 3,
        background: "linear-gradient(180deg, #e9fdf5, #ffffff)",
      }}
    >
      {products.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          No products available.
        </Typography>
      ) : null}

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: { sm: "center" },
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          🛒 Products
        </Typography>

        <Button
          onClick={() => Navigate("/addproduct")}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            width: { xs: "100%", sm: "auto" },
            background: "linear-gradient(135deg, #43cea2, #185a9d)",
            "&:hover": {
              background: "linear-gradient(135deg, #185a9d, #43cea2)",
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Table wrapper for mobile scroll */}
      <Box sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              {["Image", "Title", "Price", "Edit", "Delete"].map((h) => (
                <TableCell key={h} sx={{ fontWeight: "bold" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filterProducts
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Box
                      component="img"
                      src={p.image}
                      sx={{
                        width: { xs: 40, sm: 50, lg: 50 },
                        height: { xs: 40, sm: 50, lg: 50 },
                        borderRadius: 3,
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>

                  <TableCell>{p.title}</TableCell>

                  {/* Hide price on very small screens */}
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    ${p.price}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="success"
                      onClick={() => handleEditOpen(p)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <IconButton color="error" onClick={() => handleOpen(p.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Delete Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle fontWeight="bold">Update Product</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            value={editProduct.title}
            onChange={(e) =>
              setEditProduct({ ...editProduct, title: e.target.value })
            }
          />

          <TextField
            label="Price"
            type="number"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                price: Number(e.target.value),
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              updateProduct(editProduct.id, {
                title: editProduct.title,
                price: editProduct.price,
              });
              setEditOpen(false);
              setEditProduct({ id: null, title: "", price: "" });
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default Products;
