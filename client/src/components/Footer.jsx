import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { Toolbar, Typography, Stack, Box, Container } from '@mui/material';

function Footer() {
    return (
        <Toolbar 
            style={{ 
                position: 'fixed', 
                bottom: 0, 
                width: '100%', 
                backgroundColor: '#525252', 
                height: '8vh', 
                color: 'white',
            }}
        >
            <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Centered Typography */}
                <Typography variant="h6" style={{ textAlign: 'center', flexGrow: 1 }}>
                    Curated Crates©
                </Typography>
                
                {/* Icons on the Right */}
                <Stack direction="row" spacing={2} style={{ position: 'absolute', right: 80 }}>
                    <Box
                        component="a"
                        href="https://facebook.com"
                        sx={{
                            color: 'white',
                            textDecoration: 'none',
                            transition: 'transform 0.2s ease, color 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.2)',
                                color: '#4267B2' // Facebook blue color
                            }
                        }}
                    >
                        <FaFacebookSquare size={24} />
                    </Box>
                    <Box
                        component="a"
                        href="https://instagram.com"
                        sx={{
                            color: 'white',
                            textDecoration: 'none',
                            transition: 'transform 0.2s ease, color 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.2)',
                                color: '#E1306C' // Instagram pink color
                            }
                        }}
                    >
                        <FaInstagram size={24} />
                    </Box>
                </Stack>
            </Container>
        </Toolbar>
    );
}

export default Footer;
