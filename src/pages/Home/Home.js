import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Filters from '../../components/Filters/Filters';
import AllProducts from '../../components/AllProducts/AllProducts';
import Slider from '../../components/Slider/Slider';

const Home = ()=>{
    return(
        <>
            <Navbar/>
            <Slider/>
            <Filters/>
            <AllProducts/>
        </>
    );
}

export default Home;