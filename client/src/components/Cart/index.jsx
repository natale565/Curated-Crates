import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { CHECKOUT } from '../../utils/mutations';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import AuthService from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
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
<<<<<<< HEAD
=======
        if (!state.cart.length) {
            alert("Your cart is empty.");
            return;
        }

        const checkoutItems = state.cart.map(item => ({
            _id: item._id,
            name: item.name || '',
            description: item.description || '',
            price: item.price || 0.0,
            shippingFrequency: item.shippingFrequency || '',
            items: item.items || [],
            image: item.image
        }));

        console.log("Checkout variables:", { SubscriptionBox: checkoutItems });

        // Use the mutation here
>>>>>>> main
        checkout({
            variables: { 
              subscriptionBoxes: [...state.cart],
        },
    });
  } 

    if (!state.cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span role="img" aria-label="trash">
                    🛒
                </span>
            </div>
        );
    }

    const isLoggedIn = AuthService.loggedIn();

    return (
        <div className="cart">
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
                        <div className="flex-row space-between">
                            <strong>Total: ${calculateTotal()}</strong>
                            <button onClick={submitCheckout}>Checkout</button>
                        </div>
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
