import React, { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // getting data form server API
    useEffect(()=>{
        fetch('https://emajohnbd.herokuapp.com/products/')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    
    // getting data form local storage
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://emajohnbd.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])

    // adding to cart
    const handleAddProduct = (product) =>{
        let samePrd = cart.find(pd => pd.key === product.key);
        let newCart;
        if (samePrd) {
            let count = samePrd.quantity + 1;
            samePrd.quantity = count;
            const other = cart.filter(pd => pd.key !== samePrd.key);
            newCart = [samePrd, ...other];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, product.quantity)
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                   {
                     cart.length !== 0 &&
                      <Link to="/review">
                        <button className="main-button">Review Order</button>
                      </Link> 
                   }
                    
               </Cart>
            </div>
            
        </div>
    );
};

export default Shop;