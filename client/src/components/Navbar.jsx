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


// eslint-disable-next-line react/prop-types
function NavBar({currentPage, handlePageChange}) {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                    Curated Crates
                </Typography>
                <Stack direction='row' spacing={2}>
                    
                    <Button color='inherit'onClick={() => handlePageChange("HomePage")}
                    className={currentPage === "HomePage" ? "nav-link active" :
                     "nav-link"}>Home</Button>

                    <Button color='inherit'onClick={() => handlePageChange("HowItWorks")} 
                    className={currentPage === "HowItWorks" ? "nav-link active" : 
                    "nav-link"}>How It Works</Button>

                    <Button color='inherit' onClick={() => handlePageChange("SignUp")} className={currentPage === "SignUp" ? "nav-link active" :
                      "nav-link"}>Sign Up</Button>

                    <Button color='inherit'onClick={() => handlePageChange("SignIn")} className={currentPage === "SignIn" ? "nav-link active" : 
                    "nav-link"}>Sign In</Button>

                </Stack>
                
            </Toolbar>
        </AppBar>

    );
}

export default NavBar;