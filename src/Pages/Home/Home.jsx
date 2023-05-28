import React, {useContext, useEffect} from 'react';
import SliderTest from './SliderTest'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CardItem from '../Catalog/CardItem';
import { CustomContext } from '../../Context';
import { Link } from 'react-router-dom';

const Home = () =>
{
    const {product, getAllProduct} = useContext(CustomContext);
    useEffect(()=>{
        getAllProduct()
    }, [])


    return(
        <div>
            <SliderTest />
            <p className='textAboveListHome'>Новые объявления</p>
            <div className="listHome">
                {
                product.sort((a,b) => b.id - a.id).map((item) => (
                    <div key={item.id} className='showCard'>
                        <Link className='link' to={`/product/${item.id}`}>
                            <CardItem 
                                name={item.name}
                                price={item.price}
                                image={item.image} 
                                creator={item.creator}
                                item={item}
                                id={item.id}
                            />
                        </Link>
                    </div>
                ))
                }
            </div>

        </div>
    )
}

export default Home;