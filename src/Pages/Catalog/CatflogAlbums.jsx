import React, {useState, useEffect, useContext} from 'react';
import CardItem from './CardItem';
import {Link} from "react-router-dom";
import { CustomContext } from '../../Context';
import { groups } from '../../Groups';

const CatalogAlbums = () =>
{
    const {albums, getAlbums} = useContext(CustomContext);
    const [groupFilter, setGroupFilter] = useState({
        group:'',
        name: ''
    })
    const [sort, setSort] = useState([])


    useEffect(()=>{
        getAlbums()
    }, [])

    return(
        <div>
        <div className="linkFromCat">
             <Link className='link'to='/'>Главная</Link><span> - Альбомы</span>
        </div>
        <div className="rightCatalogTtems">
            <div className="search">
                <div className="sortBlock">
                <div className="seachBy">
                    <input type="text" placeholder='Поиск...' className='inputSearchOther' onChange={(e) => setGroupFilter({...groupFilter, name: e.target.value})}/>
                </div>
                <div className="sortBy">
                    <select name="" id="" className='selectSearchOther'  onChange={(e) => setGroupFilter({...groupFilter, group: e.target.value})}>
                        <option value="" selected disabled>Группа</option>
                        {
                            groups.map(item =>
                                <option className="listChoose" value={item.name}>{item.name}</option>
                        )}
                        <option value="" >все</option>
                    </select>
                    <select name="" id="" className='selectSearchOther' onChange={(e) => setSort(e.target.value)}>
                        <option value="">Сортировать по цене</option>
                        <option value="less">Цена по возрастанию</option>
                        <option value="more">Цена по убыванию</option>
                    </select>
                </div>
            </div>
            </div>
            <div className="list">
                {
                    albums.sort((a,b) => sort =='more' ? b.price - a.price : sort == 'less'? a.price - b.price : '').filter(el => el.group.includes(groupFilter?.group)).filter(el => el.name.toLowerCase().includes(groupFilter?.name?.toLowerCase())).map((item) => (
                        <div key={item.id} className='showCard'>
                            <CardItem
                                
                                item={item}
                                name={item.name}
                                price={item.price}
                                image={item.image} 
                                creator={item.creator}
                                id={item.id}
                                />
                        </div>
                    ))
                }
            </div>
                
            </div>
    </div>

    )
}

export default CatalogAlbums;