import { useEffect } from 'react';
import ProductItem from './ProductItem';
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { GET_SUBSCRIPTION_BOXES } from '../utils/queries';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { idbPromise } from '../utils/helpers';

function ProductList() {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(GET_SUBSCRIPTION_BOXES);
    const { subscriptionBoxes } = state;

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                subscriptionBoxes: data.getSubscriptionBoxes // Make sure to reference this correctly
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
        <div>
            <h2>Our Subscription Boxes</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {state.subscriptionBoxes.length > 0 ? (
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
                    <p>No boxes available</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;
