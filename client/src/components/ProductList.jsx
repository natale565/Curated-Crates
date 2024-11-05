import { useEffect } from 'react';
import ProductItem from './ProductItem';
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { GET_SUBSCRIPTION_BOXES } from '../utils/queries';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

function ProductList() {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(GET_SUBSCRIPTION_BOXES);
    const { products } = state;

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.getSubscriptionBoxes
            });
            data.getSubscriptionBoxes.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        } else if (!loading) {
            idbPromise('products', 'get').then((products) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products
                });
            });
        }
    }, [data, loading, dispatch]);

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', textAlign: 'center' }}>
            <h2>Our Subscription Boxes</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductItem
                            key={product._id}
                            _id={product._id}
                            name={product.name}
                            images={product.images}
                            description={product.description}
                            items={product.items}
                            price={product.price}
                        />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;
