import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import './Product.css'
import Rating from 'react-rating';

const Product = (props) => {
    const {name, img, price, stock, seller} = props.product;
    const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />;
    // console.log(props.product)
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
            <h4 className="product-name">{name}</h4>
            <p><small>by: {seller}</small></p>
            <p>Price:{price}</p>
            <p> <small>only {stock} left in stoch - order soon</small></p>
            <Rating
             initialRating = {3}
             emptySymbol="far fa-star"
             fullSymbol="fas fa-star"
             readonly></Rating>
            <br />
            <button onClick={() => props.haldleAddToCart(props.product)} className="btn-regular">{cartIcon}  Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;