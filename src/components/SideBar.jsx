import React, { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import {
  Inventory,
  Category,
  Logout,
  Dashboard,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";

const drawerWidth = 240;

function SideBar() {
  const navigate = useNavigate();
  const { logout } = useContext(LoginContext);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItem = (text, icon, path) => (
    <ListItemButton
      key={text}
      component={Link}
      to={path}
      selected={location.pathname === path}
      onClick={() => setMobileOpen(false)} // close on mobile click
      sx={{
        mx: 1,
        my: 0.5,
        borderRadius: 2,
        "&.Mui-selected": {
          backgroundColor: "#e0e0e0",
        },
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      {icon}
      <ListItemText sx={{ ml: 2 }} primary={text} />
    </ListItemButton>
  );

  const drawerContent = (
    <>
      {/* Logo */}
      <Box sx={{ p: 3, textAlign: "center", cursor: "pointer" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          onClick={() => navigate("/")}
        >
          Admin Panel
        </Typography>
      </Box>

      <Divider />

      {/* Menu */}
      <List>
        {menuItem("Dashboard", <Dashboard />, "/")}
        {menuItem("Products", <Inventory />, "/Products")}
        {menuItem("Category", <Category />, "/Category")}
        {menuItem("Users", <PeopleIcon />, "/users")}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Logout */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <IconButton
          onClick={logout}
          sx={{
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "#e0e0e0",
              transform: "scale(1.1)",
            },
          }}
        >
          <Logout />
        </IconButton>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1300,
          display: { xs: "block", md: "none" },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #e9fdf5, #ffffff)",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default SideBar;
