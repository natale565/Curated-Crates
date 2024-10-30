// eslint-disable-next-line react/prop-types
function NavBar ({currentPage, handlePageChange}){
    return (
        <>
        <nav>
            <ul>
                <li>
                    <a href="#HowItWorks" 
                    onClick={() => handlePageChange("HowItWorks")} 
                    className={currentPage === "HowItWorks" ? "nav-link active" : 
                    "nav-link"}
                    >How It Works</a>
                </li>
                <li>
                    <a href="#SignUp" onClick={() => handlePageChange("SignUp")} className={currentPage === "SignUp" ? "nav-link active" :
                     "nav-link"}
                     >Sign Up</a>
                </li>
                <li>
                    <a href="#signIn" onClick={() => handlePageChange("SignIn")} className={currentPage === "SignIn" ? "nav-link active" : 
                    "nav-link"}
                    >Sign In</a>
                </li>
            </ul>
        </nav>
        </>
    );
}

export default NavBar;