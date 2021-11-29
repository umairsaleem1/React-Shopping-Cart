import React, { useState, useReducer } from 'react';
import cartContext from './CartContext';
import data from '../components/Data/data';
import cartReducer from './reducers/cartReducer';

// setting products equal to data(items) array
const products = data;
const initialState = [];

const CartProvider = ({children})=>{

    // main state that will contain the products which user added to the cart
    const [state, dispatch] = useReducer(cartReducer, initialState);
    // state variable that will contain the filters that will be applied on products
    const [filters, setFilters] = useState({search:'', deliver:'', rate:'', sort:'asc'});
    
    return(
        <cartContext.Provider value={[products, state, dispatch, filters, setFilters]}>
            {children}
        </cartContext.Provider>
    );
}

export default CartProvider;