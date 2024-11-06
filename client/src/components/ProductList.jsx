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
    const { subscriptionBoxes } = state;

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
<<<<<<< HEAD
                subscriptionBoxes: data.getSubscriptionBoxes // Make sure to reference this correctly
=======
                products: data.getSubscriptionBoxes
>>>>>>> main
            });
            data.getSubscriptionBoxes.forEach((subscriptionBox) => {
                idbPromise('SubscriptionBox', 'put', subscriptionBox);
            });
        } else if (!loading) {
            idbPromise('SubscriptionBox', 'get').then((subscriptionBoxes) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    subscriptionBoxes: subscriptionBoxes
                });
            });
        }
    }, [data, loading, dispatch]);

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', textAlign: 'center' }}>
            <h2>Our Subscription Boxes</h2>
<<<<<<< HEAD
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {state.subscriptionBoxes.length > 0 ? (
                    subscriptionBoxes.map((subscriptionBox) => (
=======
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                {products.length > 0 ? (
                    products.map((product) => (
>>>>>>> main
                        <ProductItem
                            key={subscriptionBox._id}
                            _id={subscriptionBox._id}
                            name={subscriptionBox.name}
                            image={subscriptionBox.image}
                            description={subscriptionBox.description}
                            items={subscriptionBox.items}
                            price={subscriptionBox.price}
                            shippingFrequency={subscriptionBox.shippingFrequency}
                        />
                    ))
                ) : (
                    <p>No boxes available</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;
