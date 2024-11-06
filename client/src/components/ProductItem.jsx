import { Link } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from '../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

function ProductItem(item) {
    const [state, dispatch] = useStoreContext();
    const { images, name, _id, description, items = [], price } = item;
    const { cart } = state;

    // State for select dropdown
    const [shippingFrequency, setFrequency] = useState('');
    const handleFrequencyChange = (event) => {
        setFrequency(event.target.value);
    };

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id);
        if(itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
                shippingFrequency: shippingFrequency
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
                shippingFrequency: shippingFrequency
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, shippingFrequency: shippingFrequency, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, shippingFrequency: shippingFrequency, purchaseQuantity: 1 });
        }
    };

    return (
        <Box
            sx={{
                width: '220px',
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
            <Link 
                to={`/products/${_id}`} 
                style={{ textDecoration: 'none' }}
                sx={{
                    color: '#00BFFF',  // Light blue color for links
                    transition: 'color 0.2s',
                    '&:hover': {
                        color: '#1E90FF',  // Darker blue on hover
                    },
                }}
            >
                <Box component="img" 
                     src={`/images/${images}`} 
                     alt={name} 
                     sx={{ width: '100%', height: 'auto', mb: 1 }} 
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 0.5 }}>
                    {name}
                </Typography>
            </Link>
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
                value= {shippingFrequency}
                onChange= {handleFrequencyChange}
                style={{
                    marginBottom: '10px',
                    padding: '5px',
                    fontSize: '1em',
                    color: 'black',
                }}
            >
                <option value="" disabled>Select Shipping Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
            </select>
            <Box
                component="button"
                onClick={addToCart}
                disabled={shippingFrequency === ''}
                sx={{
                    backgroundColor: shippingFrequency === '' ? '#e21d1d' : '#3840dc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                        backgroundColor: '#777',
                    },
                }}
            >
                Add to cart
            </Box>
        </Box>
    );
}

export default ProductItem;
