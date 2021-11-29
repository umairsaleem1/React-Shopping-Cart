import React, { useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Carousel from '../../components/Carousel/Carousel';
import './productdetails.css';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import cartContext from '../../Context/CartContext';


const ProductDetails = ()=>{
    // array of 5 items just to display 5 starts throught iteration
    const stars = useRef([1,2,3,4,5]);
    // state var that will contian the current selected product quantity
    const [qty, setQty] = useState(1);
    // getting the id from url
    const { identity } = useParams();
    // state and method from global state
    const [products, , dispatch] = useContext(cartContext);
    
    // getting index of the product of which id is in the url from products array
    const index = products.findIndex((elm)=>{
        return elm.id===Number(identity);
    });

    // product
    const product = products[index];
    const { id, fullname, rating, price, status, desc, carousel} = product;

    
    const increment = ()=>{
        setQty(qty+1);
    }
    const decrement = ()=>{
        if(qty===1){
            return
        }
        setQty(qty-1);
    }


    const handleCartBtnClick = (e)=>{
        e.preventDefault();
        if(status.startsWith('O')){
            alert('This product is currently not available');
            return;
        }
        e.target.style.backgroundColor = 'green';
        e.target.textContent = 'Added to Cart';
        setTimeout(()=>{
            e.target.style.backgroundColor = '#f57224';
            e.target.textContent = 'Add to Cart';
        },1000)

        let newProd = {...product, orderedQty:qty}
        dispatch({type:'ADD_TO_CART', payload:product});
        dispatch({type:'INCREMENT', payload:[newProd, product]});
    }
    return(
        <>
            <Navbar/>
            <div className='details-page'>
                <div className='carousel-container'>
                    <Carousel carousel={carousel}/>
                </div>
                <div className='details-container'>
                    <h1> {fullname }</h1>
                    <p>Product # {id}</p>
                    <hr/>
                    {
                    stars.current.map((item, ind)=>{
                        return(
                            !(ind<rating)
                            ?
                            <AiOutlineStar key={item} style={{fontSize:'1.5rem'}}/>
                            :
                            <AiFillStar key={item} style={{fontSize:'1.5rem', color:'#f57224'}}/>
                        )
                    })
                    }
                    <hr className='another-hr'/>
                    <h1 style={{color: 'green'}}>Rs. {price}</h1>
                    <div className='quantity-and-cart'>
                        <div className='quantity-controls'>
                            <div className='quantity-control-btns' onClick={decrement}>-</div>
                            <div className='quantity'> {qty} </div>
                            <div className='quantity-control-btns' onClick={()=>increment(product)}>+</div>
                        </div>
                        <button onClick={handleCartBtnClick}>Add to Cart</button>
                    </div>
                    <hr className='another-hr' style={{marginTop:'40px'}}/>
                    <h3>Status: <span style={status.startsWith('O') ? {color:'red', fontSize:'1.3rem'} : {color:'green', fontSize:'1.3rem'}}> {status} </span></h3>
                    <hr className='another-hr'/>
                    <p style={{fontSize:'1.5rem', color:'black'}}>Description :</p>
                    <div className='desc'>
                        {desc}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;