import React, {useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import CardItemOwner from '../Catalog/CardItemOwner';
import { CustomContext } from '../../Context';

const MyPosts = () =>
{
    const {product, getAllProductsById, user} = useContext(CustomContext);

    useEffect(()=>{
        getAllProductsById(user.id)
    }, [])

    return(
        <div className='myPosts'>
            <Link to='/addproduct'><button className="addprod">Добавить объвление</button></Link>
            <div className="listPosts">
                {
                product.map((item) => (
                    <div key={item.id} className='showCard'>
                        <CardItemOwner 
                            name={item.name}
                            price={item.price}
                            image={item.image} 
                            item={item}
                            id={item.id}/>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default MyPosts;