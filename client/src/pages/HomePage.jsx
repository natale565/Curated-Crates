import About from '../components/About';
import ProductList from '../components/ProductList';

function HomePage() {
    return (
        <div>
            <h1>Welcome to Curated Crates</h1>

            <About />
            <ProductList />
        </div>
    );
}

export default HomePage;