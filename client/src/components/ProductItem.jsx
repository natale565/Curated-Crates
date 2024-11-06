import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from '../utils/helpers';
import Box from '@mui/material/Box';

function ProductItem(item) {
    const [state, dispatch] = useStoreContext();
    const {
        image,
        name,
        _id,
        description,
        items = [],
        price,
        shippingFrequency,
    } = item;

    const { cart } = state

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id)

        if(itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                subscriptionBox: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }
    return (
        <>
            
            <Box component="div" sx={{ display: 'flex', gap: 2 }}>
                <Box component="section" sx={{ p: 2, border: '1px solid grey', flex: 1 }}>
                      <img
                        alt={name}
                        src={`/images/${image}`}
                        />
                        <p>{name}</p>
                        <div>
                            <div>
                                <span>{description}</span>
                            </div>
                            <div>
                                <span>{items.join(', ')}</span>
                            </div>
                            <div>
                                <span>Price: ${price}</span>
                            </div>
                            <div>
                                <span>Shipping Frequency: {shippingFrequency}</span>
                            </div>
                            <button onClick={addToCart}>Add to cart</button>
                        </div>
                </Box>
            </Box>
        </>
    );
}

export default ProductItem;
