import { Box } from '@mui/material';
import About from '../components/About';
import ProductList from '../components/ProductList';

function HomePage() {
    return (
      <div>
        <Box
          component="h1"
          sx={{
            fontSize: "3.8rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 4,
            marginTop: 13,
            background:
              "linear-gradient(90deg, #ffffff, #FFBC00, #ff8800, #FFBC00, #ffffff)",
            backgroundSize: "300% 100%", // Makes the background three times as wide
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            animation: "glimmer-horizontal 6s linear infinite",
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
