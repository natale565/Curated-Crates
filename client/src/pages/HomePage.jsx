import { Box } from '@mui/material';
import About from '../components/About';
import ProductList from '../components/ProductList';

function HomePage() {
    return (
        <div>
            <Box
                component="h1"
                sx={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center', 
                    color: 'white',
                    marginBottom: 4,
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
