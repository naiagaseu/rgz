import React, {useContext, useState, useEffect} from 'react';
import save from './img/save.png'
import { Link } from 'react-router-dom';
import { CustomContext } from '../../Context';
import axios from 'axios';


const CardItem = ({name, price, image, creator, item, id}) =>
{
    const {user, fav, getAllFavs, setFav} = useContext(CustomContext);
    
    const myFavs = (obj) => {

        if(user.id == undefined)
        {
            alert("ты слышь надо зарегаться")
            console.log(user.id)
        }
        else{
            getAllFavs(user.id)
            console.log("gotten")
            
            fav.push(obj)
            alert("Добавлено в избранное")

            console.log("brefore sort")
            
            console.log(fav)
            console.log("sort")

            let uniqueItems = fav.filter((element, index) => {
                return fav.indexOf(element) === index;
            });
            

            // const check = Array.from(new Set(fav));
            // console.log(check)

            

            axios.patch(`http://localhost:8080/users/${user.id}`, {
                favourite: uniqueItems
            })

        }
    }

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
                    {/* <img src={msg} alt="" className="msg" /> */}
                    <img src={save} alt="" className="save"/>
                </div>
            </div>
        </div>
    )
}

export default CardItem;