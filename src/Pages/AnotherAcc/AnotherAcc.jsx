import React, {useContext, useEffect, useState} from 'react';
import { CustomContext } from '../../Context';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CardItem from '../Catalog/CardItem';
import axios from 'axios';

const AnotherAcc = () =>
{
    const params = useParams();
    const {product, getAllProductsById} = useContext(CustomContext);
    const [anAcc, setAnAcc] = useState([])

    useEffect(()=>{
        getAllProductsById(params.id)
        axios.get(`http://localhost:8080/users/${params.id}`)
        .then(({data}) => {
            
            setAnAcc(data)
        })
    }, [])

    return(
        <div className="anAcParent">
            <div className="anotherAccCont">
                <div className="onAnotherAccCreatorIfo">
                    <img src={anAcc.photo} className='userPic' alt="" />
                    <div className="anotherText">
                        <p className='anotherAccName'>{anAcc.name}</p>
                        <p className='anotherAccDescr'>{anAcc.about}</p>
                        <p className='anotherAccNet'>{anAcc.networks}</p>
                    </div>
                     
                </div>
                <div className='columnCont'>
                    <p className='textAboveList'>Объявления</p>
                <div className="anotherPosts">
                   
                    {
                        product.map(item => 
                        <div key={item.id} className="anotherList">
                            <Link className='link' to={`/product/${item.id}`}>
                                <CardItem
                                    item={item}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image} 
                                    creator={item.creator}
                                    id={item.id}
                            />

                            </Link>
                        </div>
                            
                        )
                    }
                </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default AnotherAcc;