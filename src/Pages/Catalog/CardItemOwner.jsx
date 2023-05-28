import React, {useEffect, useContext} from 'react';
import trashbask from '../../img/trashback.png'
import axios from 'axios';
import { CustomContext } from '../../Context';
import {Link} from "react-router-dom";
import edit from "../../img/edit.png"

const CardItemOwner = ({name, price, image, item, id}) =>
{
    const {user, getAllProductsById} = useContext(CustomContext);

    const delPost = () => {
        if(window.confirm("Удалить пост?")){
            axios.delete(`http://localhost:8080/posts/${item.id}`)
            getAllProductsById(user.id)
        }
        
    }

    return(
        <div className='cardOwn_wrap'>
            <Link className='link' to={`/product/${id}`}>
                <img src={image} alt="" className="photo" />
                <div className="card_text">
                    <div className="cardName">{name}</div>
                    <p className="cardPrice">{price} руб</p>
                </div>
            </Link>
            
            <div className="cardAction">
                <div className="action">
                    <img src={trashbask} alt="" className="trashPic" onClick={()=>delPost()} />
                   <Link className='link' to={`/edit/${id}`}><img src={edit} alt="" className="trashPic" /></Link> 
                </div>
            </div>
        </div>
    )
}

export default CardItemOwner;