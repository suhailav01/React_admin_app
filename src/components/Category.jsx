import React, { useContext, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";
import { CategoryContext } from "../Context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";
import { Edit } from "@mui/icons-material";

function Category() {
  /////////////////////////////////////////////////
  const [editOpen, setEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState({
    id: null,
    name: "",
  });
  const handleEditOpen = (category) => {
    setEditCategory({
      id: category.id,
      name: "",
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditCategory({ id: null, name: "" });
  };

  const handleEditSave = () => {
  updateCategory(editCategory.id, {
    name: editCategory.name,
  });
  handleEditClose();
};


  //////////////////////////////////////////////
  const Navigate = useNavigate();
  const { categories, updateCategory, deleteCategory } =
    useContext(CategoryContext);
  const { search, setSearch } = useContext(SearchContext);
  const filterCategory = categories.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Paper
      sx={{
        ml: "50px",
        p: 5,
        borderRadius: 3,
        width: 920,
        marginTop: "100px",
        background: "linear-gradient(180deg, #e9fdf5, #ffffff)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          📂 Categories
        </Typography>

        <Button
          onClick={() => Navigate("/addcategory")}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 3,
            px: 3,
            background: "linear-gradient(135deg, #43cea2, #185a9d)",
            "&:hover": {
              background: "linear-gradient(135deg, #185a9d, #43cea2)",
            },
          }}
        >
          Add Category
        </Button>
      </Box>

      {/* Category List */}
      <List>
        {filterCategory.map((c) => (
          <ListItem
            key={c.id}
            sx={{
              mb: 1.5,
              borderRadius: 2,
              backgroundColor: "#f5f7ff",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#e8ecff",
                transform: "translateX(6px)",
              },
            }}
            secondaryAction={
              <Box sx={{ display: "flex", gap: 1 }}>
                {/* Edit Button */}
                <IconButton
                  color="primary"
                  onClick={() => handleEditOpen(c)}
                  sx={{
                    backgroundColor: "#e0e7ff",
                    "&:hover": {
                      backgroundColor: "#c7d2fe",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>

                {/* Delete Button */}
                <IconButton
                  color="error"
                  onClick={() => deleteCategory(c.id)}
                  sx={{
                    backgroundColor: "#fee2e2",
                    "&:hover": {
                      backgroundColor: "#fecaca",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          >
            <CategoryIcon sx={{ mr: 2, color: "primary.main" }} />
            <ListItemText
              primary={c.name}
              primaryTypographyProps={{
                fontWeight: "bold",
              }}
            />
          </ListItem>
        ))}
      </List>
      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: 400,
          },
        }}
      >
        <DialogTitle fontWeight={700}>✏️ Edit Category</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Category Name"
            value={editCategory.name}
            onChange={(e) =>
              setEditCategory({
                ...editCategory,
                name: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleEditClose}>Cancel</Button>

          <Button
            onClick={handleEditSave}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default Category;
