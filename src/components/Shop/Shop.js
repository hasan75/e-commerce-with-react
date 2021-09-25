import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(()=>{
        //console.log('product api called')
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setDisplayProducts(data)
            //console.log('product received');
        })
    },[]);

    useEffect(()=>{
        //console.log('Local Storage Cart called')
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            //console.log(savedCart)
            for(const key in savedCart){
                //console.log(key, savedCart[key])
                //console.log(key);
                const addedProduct = products.find(product => product.key === key);
                if(addedProduct){
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    //console.log(addedProduct);
                    storedCart.push(addedProduct);
                }
                
                
            }
            setCart(storedCart);
        }
    },[products])
    const haldleAddToCart = (product) => {
        //console.log("Clicked", product.name);
        const newCart = [...cart, product];
        setCart(newCart);
        //save to localstorage for now
        addToDb(product.key);

    }

    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProduct = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProduct);
    }

    return (
        <>
        <div className="search-container">
            <input onChange={handleSearch} type="text" placeholder="search product" />
        </div>
        <div className="shop-container">
            <div className="product-container">
                {
                    displayProducts.map(product => <Product
                        product={product}
                        key={product.key}
                        haldleAddToCart ={haldleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
        </>
    );
};

export default Shop;