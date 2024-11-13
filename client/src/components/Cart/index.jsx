import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
import { CHECKOUT } from "../../utils/mutations";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import AuthService from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { Box, Button, Typography } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51QG7vwCeKQc4PDCDTjHSQZJ1MfZobJi8ZPJ5RUCuM3bXBMYWer2FZp70UqLdleKo7mmzX0fC7hwoJdI0H8Plrn6300Fyi9QJlH"
);

// eslint-disable-next-line react/prop-types
const Cart = ({ onClose }) => {
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
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, subscriptionBoxes: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  // eslint-disable-next-line no-unused-vars
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    return state.cart
      .reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0)
      .toFixed(2);
  }

  function submitCheckout() {
    checkout({
      variables: {
        subscriptionBoxes: [...state.cart],
      },
    });
  }

  const isLoggedIn = AuthService.loggedIn();

  return (
    <Box
      className="cart"
      style={{ marginRight: "20px", width: "300px", padding: "20px", color: "white" }}
    >
      {" "}
      {/* Right margin for the cart */}
      <Typography
        className="close"
        onClick={onClose}
        sx={{
          background:
            "linear-gradient(90deg, #ffffff, #FFBC00, #ff8800, #FFBC00, #ffffff)",
          backgroundSize: "300% 100%", // Makes the background three times as wide
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          fontFamily: "Quicksand",
          fontWeight: "bold",
          color: "transparent",
          animation: "glimmer-horizontal 6s linear infinite",
        }}
      >
        Close
      </Typography>
      <h2>Shopping Cart</h2>
      {isLoggedIn ? (
        state.cart.length ? (
          <>
            {/* Render Cart Items */}
            {state.cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}

            {/* Display Total and Checkout Button Once */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginTop: "20px",
                width: "100%",
              }}
            >
              {/* Total Section */}
              <Typography
                variant="h6"
                sx={{ textAlign: "right", width: "100%", marginBottom: "10px" }}
              >
                Total: ${calculateTotal()}
              </Typography>

              {/* Single Checkout Button for All Items */}
              <Box
                sx={{
                  width: "100%",
                  textAlign: "right",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitCheckout}
                  sx={{
                    minWidth: "120px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="h6">
            <span role="img" aria-label="shocked">
              😱
            </span>{" "}
            You haven&apos;t added anything to your cart yet!
          </Typography>
        )
      ) : (
        <Typography variant="h6">
          Please log in to view your shopping cart.
        </Typography>
      )}
    </Box>
  );
};

export default Cart;
