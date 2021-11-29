import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './cart.css';
import cartContext from '../../Context/CartContext';

const Cart = ()=>{
    // state var that will contain the total ammount
    const [total, setTotal] = useState(0);
    // state and method from global state
    const [, state, dispatch] = useContext(cartContext);

    // calculating the total of all products in cart page
    useEffect(()=>{
        let t = state.reduce((acc, p)=>{
            return acc = acc+(p.orderedQty*p.price);
        },0);
        setTotal(t);
    },[state])

    
    const increment = (prod)=>{
        let newProd = {...prod, orderedQty:prod.orderedQty+1}
        dispatch({type:'INCREMENT', payload:[newProd, prod]});
    }
    const decrement = (prod)=>{
        if(prod.orderedQty===1){
            return;
        }
        let newProd = {...prod, orderedQty:prod.orderedQty-1};
        dispatch({type:'DECREMENT', payload:[newProd, prod]});
    }
    const deleteProduct = (prod)=>{
        dispatch({type:'DELETE', payload:prod.id})
    }
    const orderConfirm = ()=>{
        dispatch({type:'ORDER'});
    }
    return(
        <>
        <Navbar/>
        {
            state.length
            ?
            <div className='cart-items-container'>
                <h3>Cart items</h3>
                <div className='cart-items'>
                {
                    state.map((prod)=>{
                        return(
                            <div className='cart-item' key={prod.id}>
                                <div className='cart-product-info'>
                                    <img src={prod.src} alt='Product' />
                                    <h3 className='prod-n'> {prod.name} </h3>
                                </div>
                            <div className='cart-product-controls'>
                                    <div className='cart-product-control-btns' onClick={()=>decrement(prod)}>-</div>
                                    <div className='cart-product-quantity'>{prod.orderedQty}</div>
                                    <div className='cart-product-control-btns' onClick={()=>increment(prod)}>+</div>
                                </div>
                                <div className='cart-item-delete-and-price'>
                                    <div className='cart-product-price'>Rs. {prod.price*prod.orderedQty} </div>
                                    <div className='cart-product-delete-btn' onClick={()=>deleteProduct(prod)}>Delete</div>
                                </div>
                            </div>
                        )
                    }) 
                }
                </div>

                <div className='total-container'>
                    <div className='total'>
                        <p><b>Grand Total: </b>Rs. {total}</p>
                        <div className='order-now-btn' onClick={orderConfirm}>Order Now</div>
                    </div>
                </div>
                    
            </div>
            :
            <div className='empty-cart'>
                <img src='images/empty-cart.png' alt='Cart is Empty' />
            </div>
        }
        </>
    );
}

export default Cart;