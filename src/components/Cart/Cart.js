import React from 'react';
import './Cart.css';

const Cart = (props) => {
    // console.log(props.cart);
    const {cart} = props;
    let total = 0;
    for(const product of cart){
        total = total + product.price;
    }
    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Items Ordered: {cart.length}</h5>
            <h5>Total: {total}</h5>
        </div>
    );
};

export default Cart;