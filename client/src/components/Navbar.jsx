import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Box,
  Drawer,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import Cart from "./Cart/index.jsx";
import { useStoreContext } from "../utils/GlobalState.jsx";
import AuthService from "../utils/auth.js";
import "./style.css";

function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [state] = useStoreContext();
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.loggedIn());

  useEffect(() => {
    setIsAuthenticated(AuthService.loggedIn());
  }, []);

  const handleLogout = () => {
    AuthService.logout();  

    setIsAuthenticated(false);
    window.location.assign("/");  
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#333", color: "white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box component="img" src="/images/crates.png" alt="Curated Crates Logo" sx={{ width: 40, height: 40, mr: 1 }} />
            <Typography sx={{ fontFamily: "Quicksand" }} variant="h6" component="div">
              Curated Crates
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/" color="inherit" sx={buttonStyles}>
              Home
            </Button>

            <Button component={Link} to="/howitworks" color="inherit" sx={buttonStyles}>
              How It Works
            </Button>

            {isAuthenticated ? (
              <>
                <Button component={Link} to="/dash" color="inherit" sx={buttonStyles}>
                  Dashboard
                </Button>

                <Button onClick={handleLogout} color="inherit" sx={buttonStyles}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/signup" color="inherit" sx={buttonStyles}>
                  Sign Up
                </Button>

                <Button component={Link} to="/signin" color="inherit" sx={buttonStyles}>
                  Sign In
                </Button>
              </>
            )}

            {/* Shopping Cart Icon */}
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <Badge badgeContent={state.cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer for Shopping Cart */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)} sx={{ "& .MuiDrawer-paper": { backgroundColor: "#333" } }}>
        <Cart onClose={toggleDrawer(false)} />
      </Drawer>
    </>
  );
}

const buttonStyles = {
  fontFamily: "Quicksand",
  transition: "transform 0.2s ease, color 0.2s ease",
  "&:hover": {
    transform: "scale(1.2)",
    background: "linear-gradient(90deg, #ffffff, #FFBC00, #ff8800, #FFBC00, #ffffff)",
    backgroundSize: "300% 100%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    fontWeight: "bold",
    color: "transparent",
    animation: "glimmer-horizontal 6s linear infinite",
  },
};

export default NavBar;
