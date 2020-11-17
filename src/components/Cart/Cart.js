import React from 'react';


const Cart = (props) => {

    const cart = props.cart;
    //console.log(cart);
    //const total = cart.reduce( (total, prd) => total + prd.price , 0 )
    let total = 0;
    for(let i = 0; i< cart.length; i++){
        const product = cart[i];
        console.log(product.price, product.quantity)
        total = total + product.price * product.quantity || 1;
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return ( 
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shiiping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );

    // // total count
    // let count = 0;
    // props.cart.map(prd => count += prd.quantity);

    // // price adding
    // let total = 0;
    // props.cart.map(prd => total += (prd.price*prd.quantity));
    // let delivery = 12;
    // total === 0 ? delivery = 0 : delivery = 12;
    // let tax = total * 0.02;
    // let grandTotal = total+tax+delivery;

    // return (
    //     <section id="cart">
    //         <h4>Shopping Overview</h4>
    //         <h5>Total Item   :     {count}</h5>
    //         <h5>Price        :     ${total.toFixed(2)}</h5>
    //         <h5>Delivery     :     ${delivery.toFixed(2)}</h5>
    //         <h5>Tax          :     ${tax.toFixed(2)}</h5>
    //         <h5>Total        :     ${grandTotal.toFixed(2)}</h5>
    //         {props.children}
    //     </section>
    // );
    
};

export default Cart;