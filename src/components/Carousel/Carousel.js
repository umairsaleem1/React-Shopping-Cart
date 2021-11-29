import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './carousel.css';


const Carousel = ( {carousel} )=>{
    const {src1, src2, src3, src4, src5} = carousel;
    return(
        <div className='carousel'>
            <AliceCarousel className='slider'autoPlay autoPlayInterval="2000" disableButtonsControls={true} infinite={true} fadeOutAnimation={true}>
                <img src={src1} className="sliderimg" alt='Product 1'/>
                <img src={src2} className="sliderimg" alt='Product 2'/>
                <img src={src3} className="sliderimg" alt='Product 3'/>
                <img src={src4} className="sliderimg" alt='Product 4'/>
                <img src={src5} className="sliderimg" alt='Product 5'/>
            </AliceCarousel>
        </div>
    );
}

export default Carousel;