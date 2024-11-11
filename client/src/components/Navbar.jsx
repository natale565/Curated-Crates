import React from "react";
import { AppBar, Toolbar, Typography, Stack, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

function NavBar({ isAuthenticated, onLogout }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#333",
        color: "white",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box
            component="img"
            src="/images/crates.png"
            alt="Curated Crates Logo"
            sx={{ width: 40, height: 40, mr: 1, 
                animation: "shake 2s infinite alternate",
            animationDelay: "1s",}}
          />
          <Typography sx={{ fontFamily: 'Quicksand', }} variant="h6" component="div">
            Curated Crates
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              fontFamily: 'Quicksand',
              transition: "all 0.3s ease",
              "&:hover": {
                textShadow:
                  "0 0 25px #FFBC00, 0 0 35px #FFBC00, 0 0 50px #FFBC00",
                animation: "glowText 1.5s infinite alternate",
              },
            }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/howitworks"
            color="inherit"
            sx={{
              fontFamily: 'Quicksand',
              transition: "all 0.3s ease",
            
              "&:hover": {
                textShadow:
                  "0 0 25px #FFBC00, 0 0 35px #FFBC00, 0 0 50px #FFBC00",
                animation: "glowText 1.5s infinite alternate",
              },
            }}
          >
            How It Works
          </Button>

          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/dash"
                color="inherit"
                sx={{
                  fontFamily: 'Quicksand',
                  transition: "all 0.3s ease",
                 
                  "&:hover": {
                    textShadow:
                      "0 0 25px #FFBC00, 0 0 35px #FFBC00, 0 0 50px #FFBC00",
                    animation: "glowText 1.5s infinite alternate",
                  },
                }}
              >
                Dashboard
              </Button>

              <Button
                onClick={onLogout}
                color="inherit"
                sx={{
                  fontFamily: 'Quicksand',
                  transition: "all 0.3s ease",
                  
                  "&:hover": {
                    textShadow:
                      "0 0 25px #FFBC00, 0 0 35px #FFBC00, 0 0 50px #FFBC00",
                    animation: "glowText 1.5s infinite alternate",
                  },
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/signup"
                color="inherit"
                sx={{
                  fontFamily: 'Quicksand',
                  transition: "all 0.3s ease",
                  
                  "&:hover": {
                    textShadow:
                      "0 0 25px #FFBC00, 0 0 35px #FFBC00, 0 0 50px #FFBC00",
                    animation: "glowText 1.5s infinite alternate",
                  },
                }}
              >
                Sign Up
              </Button>

              <Button
                component={Link}
                to="/signin"
                color="inherit"
                sx={{
                  fontFamily: 'Quicksand',
                  transition: "all 0.3s ease",
                  
                  "&:hover": {
                    textShadow:
                      "0 0 25px #FFBC00, 0 0 35px #FFBC00, 0 0 50px #FFBC00",
                    animation: "glowText 1.5s infinite alternate",
                  },
                }}
              >
                Sign In
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
      <style>
        {`
             @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
            }

          @keyframes glowText {
            0% {
              text-shadow: 0 0 15px rgba(255, 188, 0, 0.8), 0 0 25px rgba(255, 188, 0, 0.6);
            }
            100% {
              text-shadow: 0 0 25px #FFBC00, 0 0 35px #FFBC00, 0 0 50px #FFBC00;
            }
          }
        `}
      </style>
    </AppBar>
  );
}

export default NavBar;
