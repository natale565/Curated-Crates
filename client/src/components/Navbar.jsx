// // eslint-disable-next-line react/prop-types
// function NavBar ({currentPage, handlePageChange}){
//     return (
//         <>
//         <nav>
//             <ul>
//                 <li>
//                     <a href="#HomePage"
//                     onClick={() => handlePageChange("HomePage")}
//                     className={currentPage === "HomePage" ? "nav-link active" :
//                     "nav-link"}
//                     >Home</a>
//                 </li>
//                 <li>
//                     <a href="#HowItWorks" 
//                     onClick={() => handlePageChange("HowItWorks")} 
//                     className={currentPage === "HowItWorks" ? "nav-link active" : 
//                     "nav-link"}
//                     >How It Works</a>
//                 </li>
//                 <li>
//                     <a href="#SignUp" onClick={() => handlePageChange("SignUp")} className={currentPage === "SignUp" ? "nav-link active" :
//                      "nav-link"}
//                      >Sign Up</a>
//                 </li>
//                 <li>
//                     <a href="#signIn" onClick={() => handlePageChange("SignIn")} className={currentPage === "SignIn" ? "nav-link active" : 
//                     "nav-link"}
//                     >Sign In</a>
//                 </li>
//             </ul>
//         </nav>
//         </>
//     );
// }

// export default NavBar;

import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Curated Crates
                </Typography>
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
                        to="/how-it-works"
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
