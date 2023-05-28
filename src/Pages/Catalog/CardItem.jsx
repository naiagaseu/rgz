import React, {useContext, useState, useEffect} from 'react';
import save from './img/save.png'
import { Link } from 'react-router-dom';


const CardItem = ({name, price, image, creator, item, id}) =>
{
    
   
    return(
        <div className='card_wrap'>
             <Link className='link' to={`/product/${id}`}>
                <img src={image} alt="" className="photo" />
                <div className="card_text">
                    <div className="cardName">{name}</div>
                    <p className="cardPrice">{price} руб</p>
                </div>
             </Link>
            
            <div className="cardAction">
                <div className="creatorBlock">
                    <Link className='link' to={`/anotheraccount/${creator.id}`}><p className='creatorName'>{creator.name}</p></Link>
                </div>
                <div className="action">
                    <img src={save} alt="" className="save"/>
                </div>
            </div>
        </div>
    )
}

export default CardItem;