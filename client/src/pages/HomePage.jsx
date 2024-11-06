import { Box } from '@mui/material';
import About from '../components/About';
import ProductList from '../components/ProductList';

function HomePage() {
    return (
        <div>
            <Box
                component="h1"
                sx={{
                    fontSize: '2.5rem',       // Adjust font size
                    fontWeight: 'bold',       // Make it bold
                    textAlign: 'center',      // Center the text
                    color: 'white',    // Use MUI theme color
                    marginBottom: 4,          // Add spacing below
                }}
            >
                Welcome to Curated Crates
            </Box>
            <About />
            <ProductList />
        </div>
    );
}

export default HomePage;
