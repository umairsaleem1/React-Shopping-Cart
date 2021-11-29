import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { FaSearch } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import cartContext from '../../Context/CartContext';



const Navbar = ()=>{
    // state var that will contain the value in searchBox
    const [value, setValue] = useState('');
    // state and method from global state
    const [, state, , filters, setFilters] = useContext(cartContext);


    const handleChange = (e)=>{
        setValue(e.target.value);
    }

    // updating the search filter in global state on search button click
    const handleClick = ()=>{
        setFilters({...filters, search:value});
        setValue('');
    }
    return(
        <nav className='navbar'>
            <NavLink to='/' className='logo'>Shopping Cart</NavLink>
            <div className='search-container'>
                <button onClick={handleClick}><FaSearch/></button>
                <input type='text'placeholder='Search a Product' value={value} onChange={handleChange}/>
            </div>
            <NavLink to='/cart' className='cart-link'>
                <div className='cart-icon-container'>
                    <HiOutlineShoppingCart style={{fontWeight:'800', fontSize:'1.7rem'}}/>
                    {
                        state.length
                        ?
                        <span>
                            {
                                state.reduce((acc,prod)=>{
                                    return acc = acc+prod.orderedQty;
                                },0)
                            }
                        </span>
                        :
                        ''
                    }
                    
                </div>
            </NavLink>
        </nav>
    );
}

export default Navbar;