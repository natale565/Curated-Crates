import { Box, Typography, Button } from '@mui/material';
import { useStoreContext } from '../utils/GlobalState';
import { REMOVE_FROM_CART } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { FaTrashAlt } from 'react-icons/fa'; // Trash icon

function CartItem({ item }) {
    const [state, dispatch] = useStoreContext();

    const removeItem = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id,
        });
        idbPromise('cart', 'delete', { _id: item._id });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="body1">{item.name}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    onClick={removeItem}
                    sx={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#f44336',
                        },
                    }}
                >
                    <FaTrashAlt size={14} />
                </Button>
                <Typography variant="body1">
                {item.shippingFrequency.charAt(0).toUpperCase() + item.shippingFrequency.slice(1)}
                </Typography>
                <Typography variant="body1">{item.purchaseQuantity}</Typography>
                <Typography varient='body1'>{item.price}</Typography>


            </Box>
        </Box>
    );
}

export default CartItem;
