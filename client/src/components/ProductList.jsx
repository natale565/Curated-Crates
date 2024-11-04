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
    const { products } = state;

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.getSubscriptionBoxes // Make sure to reference this correctly
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
        <div>
            <h2>Our Subscription Boxes</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {products.length > 0 ? ( // Check if products has items
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
