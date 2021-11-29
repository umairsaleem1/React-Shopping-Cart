import React, { useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './product.css';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import cartContext from '../../Context/CartContext';

const Product = ({product})=>{
    const {name, price, delivery, rating, src} = product;
    // array of 5 items just to diaplay 5 starts through iteration
    const stars = useRef([1,2,3,4,5]);
    // method from global state
    const [, , dispatch] = useContext(cartContext);


    const handleCartBtnClick = (e, prod)=>{
        e.preventDefault();
        if(prod.status.startsWith('O')){
            alert('This product is currently not available');
            return;
        }
        e.target.style.backgroundColor = 'green';
        e.target.textContent = 'Added to Cart';
        setTimeout(()=>{
            e.target.style.backgroundColor = '#f57224';
            e.target.textContent = 'Add to Cart';
        },1000)
        dispatch({type:'ADD_TO_CART', payload:prod});
    }
    return(
            <NavLink to={`/${product.id}`} style={{textDecoration:'none', color:'black'}}>
                <div className='product-container'>
                    <div className='product-image-container'>
                        <img src={src} alt='' />
                    </div>
                    <div className='product-text-container'>
                        <h2 className='product-name'> {name} </h2>
                        <p className='product-price'>Rs. {price} </p>
                        <p style={{marginBottom:'5px'}}> {delivery} </p>
                        {
                            stars.current.map((item, ind)=>{
                                return(
                                    !(ind<rating)
                                    ?
                                    <AiOutlineStar key={item}/>
                                    :
                                    <AiFillStar key={item}/>
                                )
                            })
                        }
                        <br/>
                        <button className='add-to-cart-btn' onClick={(e)=>handleCartBtnClick(e, product)}>Add to Cart</button>
                    </div>
                </div>
            </NavLink>
    );
}

export default Product;