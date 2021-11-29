import React, { useState, useRef, useContext } from 'react';
import './filters.css';
import { GoSettings } from "react-icons/go";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import cartContext from '../../Context/CartContext';



const Filters = ()=>{
    // array just to iterate the 5 star icons
    const stars = useRef([1,2,3,4,5]);
    // state var that will contain the deliverty filter value
    const [delivery, setDelivery] = useState('');
    // state var that will contain no of stars the user selected for filter
    const [selectedStars, setSelectedStars] = useState(0);
    // state var that will contain the sortting method filter value
    const [sorting, setSorting] = useState('asc');
    // state, and method from global state
    const [, , , filters, setFilters] = useContext(cartContext);

    console.log(sorting)

    // updating the state on delivery change in local as well as global state
    const handleDelivery = ()=>{
        if(delivery===''){
            setDelivery('fast');
            setFilters({...filters, deliver:'fast'});
        }else{
            setDelivery('');
            setFilters({...filters, deliver:''});
        }
    }
     // updating the state on stars change in local as well as global state
    const handleStarClick = (starNo)=>{
        setSelectedStars(starNo);
        setFilters({...filters, rate:starNo});
    }
     // updating the state on sorting change in local as well as global state
    const handleSorting = (e)=>{
        setSorting(e.target.value);
        setFilters({...filters, sort:e.target.value});
    }

    // function that will reset all filters
    const clearFilters = ()=>{
        setDelivery('');
        setSelectedStars(0);
        setSorting('asc');
        setFilters({...filters, deliver:'', rate:0, sort:'asc'});
    }
    return(
        <div className='filters-container'>
            <p>Filters &nbsp;&nbsp;<GoSettings/></p>
            <div className='filters'>
                <div className='checkbox-filters'>
                    <input type='checkbox' checked={delivery}value={delivery} onClick={handleDelivery} />&nbsp;&nbsp;Fast Delivery Only
                </div>
                <div className='rating-filters'>
                    <label style={{paddingBottom:'5px'}}>Rating: &nbsp;</label>
                    {
                        stars.current.map((item, ind)=>{
                            return(
                                !(ind<selectedStars)
                                ?
                                <AiOutlineStar className='star' key={item} val={item} onClick={()=>handleStarClick(item)}/>
                                :
                                <AiFillStar className='star' key={item} val={item} onClick={()=>handleStarClick(item)} style={{color:'#f57224'}}/>
                            )
                        })
                    }
                </div>
                <div className='sorting-filters'>
                    <select onChange={handleSorting}>
                        <option value='asc' selected={sorting==='asc' ? true : false}>Ascending</option>
                        <option value='desc' >Descending</option>
                    </select>
                </div>
            </div>
            <button className='clear-filters-btn' onClick={clearFilters}>Clear Filters</button>
        </div>
    )
}

export default Filters;