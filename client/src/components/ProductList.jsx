import { useEffect } from 'react';
import ProductItem from './ProductItem';
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { GET_SUBSCRIPTION_BOXES } from '../utils/queries';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ProductList() {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(GET_SUBSCRIPTION_BOXES);
    const { subscriptionBoxes } = state;

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                subscriptionBoxes: data.getSubscriptionBoxes
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
          <Typography
    variant="h2"
    component="h2"
    gutterBottom
    sx={{
        position: 'relative',
        display: 'inline-block',
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #ffffff, #ffddc1, #ff8800, #ffddc1, #ffffff)',
        backgroundSize: '300% 100%', // Makes the background three times as wide
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        animation: 'glimmer-horizontal 6s linear infinite'
    }}
    
>
    Our Subscription Boxes
    
</Typography>
<style>
                {`
                    @keyframes glimmer-horizontal {
                        0% {
                            background-position: -200%;
                        }
                        100% {
                            background-position: 200%;
                        }
                    }
                `}
            </style>

            <Box 
                sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}
            >
                {subscriptionBoxes && subscriptionBoxes.length > 0 ? (
                    subscriptionBoxes.map((subscriptionBox) => (
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
                    !loading && <p>No boxes available</p>
                )}
            </Box>
        </div>
    );
}

export default ProductList;
