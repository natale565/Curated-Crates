import React from 'react';
import { AppBar, Toolbar, Typography, Stack, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './style.css';

// eslint-disable-next-line react/prop-types
function NavBar({ isAuthenticated, onLogout }) {
    return (
        <AppBar position='static' sx={{
            backgroundColor: '#333',
            color: 'white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}>
            <Toolbar>
                {/* Container for logo and title */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Box 
                        component="img" 
                        src="./public/images/crates.png"
                        alt="Curated Crates Logo" 
                        sx={{ width: 40, height: 40, mr: 1 }}
                    />
                    <Typography variant='h6' component='div'>
                        Curated Crates
                    </Typography>
                </Box>

                <Stack direction='row' spacing={2}>
                    <Button
                        component={Link}
                        to="/"
                        color='inherit'
                        sx={{
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                                boxShadow: '0 0 20px rgba(255, 255, 255, 1)',
                                animation: 'glow 1.5s infinite alternate',
                            },
                        }}
                    >
                        Home
                    </Button>

                    <Button
                        component={Link}
                        to="/howitworks"
                        color='inherit'
                        sx={{
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                                boxShadow: '0 0 20px rgba(255, 255, 255, 1)',
                                animation: 'glow 1.5s infinite alternate',
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
                                color='inherit'
                                sx={{
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 0 20px rgba(255, 255, 255, 1)',
                                        animation: 'glow 1.5s infinite alternate',
                                    },
                                }}
                            >
                                Dashboard
                            </Button>

                            <Button
                                onClick={onLogout}
                                color='inherit'
                                sx={{
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 0 20px rgba(255, 255, 255, 1)',
                                        animation: 'glow 1.5s infinite alternate',
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
                                color='inherit'
                                sx={{
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 0 20px rgba(255, 255, 255, 1)',
                                        animation: 'glow 1.5s infinite alternate',
                                    },
                                }}
                            >
                                Sign Up
                            </Button>

                            <Button
                                component={Link}
                                to="/signin"
                                color='inherit'
                                sx={{
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 0 20px rgba(255, 255, 255, 1)',
                                        animation: 'glow 1.5s infinite alternate',
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
                    @keyframes glow {
                        0% {
                            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                        }
                        100% {
                            box-shadow: 0 0 30px rgba(255, 255, 255, 1);
                        }
                    }
                `}
            </style>
        </AppBar>
    );
}

export default NavBar;
