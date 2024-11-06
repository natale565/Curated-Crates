import PropTypes from 'prop-types';
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

const CartItem = ({ item }) => {
    const [, dispatch] = useStoreContext();

    const removeFromCart = (item) => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', {...item});
    };

    const onChange = (e) => {
        const value = e.target.value;
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
            idbPromise('cart', 'delete', { ...item });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    }

    return (
        <div className="flex-row">
            <div>
                <img
                src={`/images/${item.image}`}
                alt=""
                />
            </div>
            <div className='cart-item-details'>
                    <div>Box: {item.name}</div>
                    <div>Price: ${item.price}</div>
                    <div>Shipping Frequency: {item.shippingFrequency}</div>
                <div>
                    <span>Qty:</span>
                    <input
                    type="number"
                    placeholder="1"
                    value={item.purchaseQuantity}
                    onChange={onChange}
                    />
                    <span
                    role="img"
                    aria-label="trash"
                    onClick={() => removeFromCart(item)}
                    >
                     🗑️
                    </span>
                </div>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string,
        price: PropTypes.number.isRequired,
        shippingFrequency: PropTypes.string.isRequired,
        purchaseQuantity: PropTypes.number.isRequired,
        shippingFrequency: PropTypes.string.isRequired,
    }).isRequired,
};

export default CartItem;