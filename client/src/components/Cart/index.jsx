import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { CHECKOUT } from '../../utils/mutations';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import AuthService from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import Badge from '@mui/material/Badge';
import { Box, Button } from '@mui/material';
import './style.css';

const stripePromise = loadStripe('pk_test_51QG7vwCeKQc4PDCDTjHSQZJ1MfZobJi8ZPJ5RUCuM3bXBMYWer2FZp70UqLdleKo7mmzX0fC7hwoJdI0H8Plrn6300Fyi9QJlH');

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [checkout, { data }] = useMutation(CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, subscriptionBoxes: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        return state.cart.reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0).toFixed(2);
    }

    function submitCheckout() {
        checkout({
            variables: { 
              subscriptionBoxes: [...state.cart],
        },
    });
  } 

    if (!state.cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <Badge badgeContent={state.cart.length} color="secondary" overlap="circular">
                <span role="img" aria-label="trash">
                    🛒
                </span>
                </Badge>
            </div>
        );
    }

    const isLoggedIn = AuthService.loggedIn();

    return (
        <div className="cart" style={{ marginRight: '20px' }}> {/* Right margin for the cart */}
            <div className="close" onClick={toggleCart}>
                close
            </div>
            <h2>Shopping Cart</h2>
            {isLoggedIn ? ( 
                state.cart.length ? (
                    <>
                      {state.cart.map((item) => (
                        <CartItem key={item._id} item={item} />
                      ))}
                      
                      <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end', // Aligns content to the right
                            marginTop: '20px',
                            width: '100%', // Ensure it spans the full width of the container
                        }}
                      >
                        {/* Total Section */}
                        <strong
                            style={{
                                fontSize: '1.2rem',
                                marginBottom: '10px',
                                textAlign: 'right',
                                width: '100%', // Ensure the total spans the full width
                            }}
                        >
                            Total: ${calculateTotal()}
                        </strong>
                        
                        {/* Checkout Button Section */}
                        <Box
                            sx={{
                                width: '100%',
                                textAlign: 'right',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={submitCheckout}
                                sx={{
                                    minWidth: '120px',
                                    padding: '10px 20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Checkout
                            </Button>
                        </Box>
                      </Box>
                    </>
                ) : (
                    <h3>
                        <span role="img" aria-label="shocked">😱</span>
                        You haven't added anything to your cart yet!
                    </h3>
                )
            ) : (
                <h3>
                    Please log in to view your shopping cart.
                </h3>
            )}
        </div>
    );
};

export default Cart;
