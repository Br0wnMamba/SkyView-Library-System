import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  Snackbar,
  Alert,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { RiBookShelfFill } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import RegisterOverlay from "../LoggedOutOverlay/Register/RegisterOverlay";
import LoginOverlay from "../LoggedOutOverlay/Login/LoginOverlay";
import LoggedInOverlay from "../LoggedInOverlay/LoggedInOverlay";
import accountManager from "../../utils/AccountManager";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [overlayView, setOverlayView] = useState("login");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const user = accountManager.getUser();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        className="navbar"
        sx={{
          backgroundColor: "#16273e",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar className="toolbar">
          <Box className="brand">
            <IoBookOutline className="brandIcon" />
            <span className="brandText">Skyview Library</span>
          </Box>

          <SearchBar />

          <Box className="iconGroup">
            <IconButton onClick={() => navigate("/")}>
              <HomeOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/bookshelf")}>
              <RiBookShelfFill
                style={{ width: 24, height: 24, color: "white" }}
              />
            </IconButton>
            <IconButton onClick={() => navigate("/cart")}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
            <IconButton onClick={toggleDrawer(true)}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {drawerOpen && (
        <Box
          onClick={toggleDrawer(false)}
          sx={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: (theme) => theme.zIndex.drawer - 1,
          }}
        />
      )}

      {/* drawer used for the profile overlay */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={drawerOpen}
        sx={{
          width: 400,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 450,
            boxSizing: "border-box",
            top: "64px",
          },
        }}
      >
        {/* changes the overlay depending on login status */}
        {user ? (
          <LoggedInOverlay
            onClose={() => setDrawerOpen(false)}
            setSnackbar={setSnackbar}
          />
        ) : overlayView === "login" ? (
          <LoginOverlay
            onClose={() => setDrawerOpen(false)}
            setOverlayView={setOverlayView}
            setSnackbar={setSnackbar}
          />
        ) : (
          <RegisterOverlay
            onClose={() => setDrawerOpen(false)}
            setOverlayView={setOverlayView}
            setSnackbar={setSnackbar}
          />
        )}
      </Drawer>

      {/* gives alerts on successful/unsuccessful registration or login :D */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NavBar;
