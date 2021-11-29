import React, { useContext } from 'react';
import './allproducts.css';
import Product from '../Product/Product';
import cartContext from '../../Context/CartContext';

const AllProducts = ()=>{
    // getting state from global state
    const [products, , , filters] = useContext(cartContext);
    // destructring the filters state
    const {search, deliver, rate, sort} = filters;


    // sorting the products according to the value that the sort filter currently contians
    const sortingFun = ()=>{
        if(sort==='asc'){
            products.sort((elm1, elm2)=>{
                let res = elm1.name > elm2.name;
                if(res){
                    return 1
                }else{
                    return -1;
                }
            });
        }
        else{
            products.sort((elm1, elm2)=>{
                let res = elm1.name < elm2.name;
                if(res){
                    return 1;
                }else{
                    return -1;
                }
            })
        }
    }
    sortingFun();

    return(
        <div className='products-container'>
            <h2 className='products-heading'>Products</h2>
            <div className='products-list'>
                {
                    products.map((product)=>{
                        let finalProd;
                        if(search || deliver || rate ){
                            let prod;
                            if(search && deliver && rate){
                                prod = product.delivery.toLowerCase().startsWith('fast') && product.rating===rate && product.fullname.toLowerCase().includes(search.toLowerCase())
                            }
                            else if(search && deliver){
                                prod = product.delivery.toLowerCase().startsWith('fast') && product.fullname.toLowerCase().includes(search.toLowerCase())
                            }
                            else if(search && rate){
                                prod = product.rating===rate && product.fullname.toLowerCase().includes(search.toLowerCase())
                            }
                            else if(deliver && rate){
                                prod = product.rating===rate && product.delivery.toLowerCase().startsWith('fast')
                            }
                            else if(search){
                                prod = product.fullname.toLowerCase().includes(search.toLowerCase())
                            }
                            else if(deliver){
                                prod = product.delivery.toLowerCase().startsWith('fast');
                            }
                            else if(rate){
                                prod = product.rating===rate
                            }

                            if(prod){
                                prod = <Product key={product.id} product={product} />
                            }else{
                                prod = ''
                            }
                            finalProd = prod;
                        }else{
                            return(
                                finalProd = <Product key={product.id} product={product} />      
                            )
                        }
                        return finalProd
                    })
                }
                
            </div>
        </div>
    );
}

export default AllProducts;