import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from '../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

function ProductItem(item) {
    const [state, dispatch] = useStoreContext();
    const { cart } = state;
    const { image, name, _id, description, items = [], price } = item;

    // State for selected shipping frequency
    const [selectedFrequency, setSelectedFrequency] = useState('');
    const handleFrequencyChange = (event) => setSelectedFrequency(event.target.value);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id);

        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
                shippingFrequency: selectedFrequency,
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
                shippingFrequency: selectedFrequency,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                subscriptionBox: { ...item, shippingFrequency: selectedFrequency, purchaseQuantity: 1 },
            });
            idbPromise('cart', 'put', { ...item, shippingFrequency: selectedFrequency, purchaseQuantity: 1 });
        }
    };

    return (
        <Box component="div" sx={{ display: 'flex', gap: 2 }}>
            <Box
                sx={{
                    width: '320px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: '#333',
                    color: 'white',
                }}
            >

            <Box 
                component="img" 
                    src={`/images/${image}`} 
                    alt={name} 
                    sx={{ width: '100%', height: 'auto', mb: 1 }} 
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: 0.5 }}>
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
                    {description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
                    {items.join(', ')}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
                    ${price}
                </Typography>
                <select
                    value={selectedFrequency}
                    onChange={handleFrequencyChange}
                    style={{
                        width: '100%',
                        marginTop: '10px',
                        marginBottom: '10px',
                        padding: '10px',
                        fontSize: '1em',
                        color: 'white',
                        backgroundColor: '#333',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                    }}
                >
                    <option value="" hidden>Select Shipping Frequency (required)</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                </select>
                <Box
                    component="button"
                    onClick={addToCart}
                    disabled={!selectedFrequency}
                    sx={{
                        width: '100%', 
                        backgroundColor: '#FFBC00',
                        color: 'black',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                            backgroundColor: '#1E90FF',
                        },
                    }}
                >
                    <Box>
                        <span style={{ fontSize: '18px' }}>Add to cart</span>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ProductItem;
