import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Toolbar, Typography, Stack, Box, Container } from '@mui/material';

function Footer() {
    // Shared styles for icons
    const iconStyles = {
        color: 'white',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, color 0.2s ease',
        '&:hover': {
            transform: 'scale(1.2)',
        }
    };

    // Shared styles for the toolbar and container
    const toolbarStyles = {
        backgroundColor: '#333', // Match navbar color
        color: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Match navbar shadow
        display: 'flex',
        justifyContent: 'center',
        // position: 'fixed',
        bottom: '0',
        marginTop: '30px',
        width: '100%',
        left: '0',
        position: 'relative',
        boxSizing: 'border-box',
    };


    return (
        <Toolbar sx={toolbarStyles}>
            <Container maxWidth="lg" sx={{ display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                 }}>
                
                {/* Centered Typography */}
                <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
                    Curated Crates©
                </Typography>
                
                {/* Icons on the Right */}
                <Stack direction="row" spacing={2} sx={{ position: 'absolute', right: 80 }}>

                    <Box
                        component="a"
                        href="mailto:curatedcrates@gmail.com"
                        sx={{ ...iconStyles, '&:hover': { color: '#4267B2' } }} // Facebook blue for email
                    >
                        <MdOutlineEmail size={24} />
                    </Box>
                    <Box
                        component="a"
                        href="https://facebook.com"
                        sx={{ ...iconStyles, '&:hover': { color: '#4267B2' } }} // Facebook blue
                    >
                        <FaFacebookSquare size={24} />
                    </Box>
                    <Box
                        component="a"
                        href="https://instagram.com"
                        sx={{ ...iconStyles, '&:hover': { color: '#E1306C' } }} // Instagram pink
                    >
                        <FaInstagram size={24} />
                    </Box>
                </Stack>
            </Container>
        </Toolbar>
    );
}

export default Footer;
