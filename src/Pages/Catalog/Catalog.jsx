import React, {useState, useEffect, useContext} from 'react';
import CardItem from './CardItem';
import { CustomContext } from '../../Context';
import { Link } from 'react-router-dom';
import { groups } from '../../Groups';

const Catalog = () =>
{
    const {getAllFavs, cards, getCards, filter, setFilter} = useContext(CustomContext);
    const [mem, setMem] = useState([])
    const [sort, setSort] = useState([])
    const [filterReset, setFilterReset] = useState({
        group : '',
        members: [],
        member: '',
        type: '',
        choice: '',
        name:''
    })

    const getMem = () => {
        groups.map(item =>
            {
                if (item.name == filter.group) 
                {
                    setMem(item.members)
                }
            })
        getCards(filter, "карта")
        console.log(filter)
    }

    const cleanAll = () => 
    {
        getCards(filterReset, "карта")
        setFilter({group : '',
        members: [],
        member: '',
        type: '',
        choice: '',
        name:''})
        console.log(filter)
    }

    useEffect(()=>{
        getCards(filter, "карта")
        console.log(filter)
        
    }, [])

    return(
        <div className="">
            <div className="linkFromCat">
                 <Link className='link'to='/'>Главная</Link><span> - Каталог карт</span>
            </div>
            <div className='allCatalogCard'>
            <div className='leftCatalog'>
                <p className="nameFilter">Фильтры</p>
                <p className="textSort">Категория</p>
                <select name="" id="" className="typeCard" onChange={(e) => setFilter({...filter, choice: e.target.value})}>
                <option value="" selected disabled>выбрать</option>
                        <option value="предзаказка">предзаказка</option>
                        <option value="регулярка">регулярка</option>
                        <option value="ивент">ивент</option>
                        <option value="мерч">мерч</option>
                        <option value="айди">айди</option>
                        <option value="ленти">ленти</option>
                        <option value="тикет">тикет</option>
                        <option value="фото-фильм">фото-фильм</option>
                        <option value="открытка">открытка</option>
                        <option value="фанмэйд">фанмэйд</option>
                </select>
                <button type='button' onClick={()=>getMem()} className='filterSubmit'>подтвердить</button>
                <p className="textSort">Группа</p>
                <select name="" id="" className="nameGroup" 
                    onChange={(e) => setFilter({...filter, group: e.target.value})}>
                <option value="" selected disabled>выбрать</option>
                    {
                        groups.map(item =>
                            <option className="listChoose" value={item.name}>{item.name}</option>
                    )}
                </select>
                <button type='button' onClick={()=>getMem()} className='filterSubmit'>подтвердить</button>
                <p className="textSort">Мембер(ка)</p>
                <select name="" id="" className="groupMember" onChange={(e) => setFilter({...filter, member: e.target.value})}>
                <option value="" selected disabled>выбрать</option>
                {
                    mem.map(item =>
                        <option className="listChoose" key ={item.id} value={item}>{item}</option>
                         )
                }
                </select>
                <button type='button' onClick={()=>getMem()} className='filterSubmit'>подтвердить</button>
                <button type='button' onClick={()=>cleanAll()} className='filterCancel'>сбросить все</button>
               </div>

            <div className="rightCatalog">
                <div className="search">
                        <div className="sortBlock">
                            <div className="seachBy">
                                <input value={filter.name} type="text" onChange={(e) => setFilter({...filter, name: e.target.value})} placeholder='Поиск...' className='inputSearch'/>
                            </div>
                            <div className="sortBy">
                                <select name="" id="" className='selectSearch' onChange={(e) => setSort(e.target.value)}>
                                    <option value="">Сортировать по цене</option>
                                    <option value="less">Цена по возрастанию</option>
                                    <option value="more">Цена по убыванию</option>
                                </select>
                                <button className="showSorted" type="button" onClick={()=>getMem()}>Показать</button>
                            </div>
                        </div>
                </div>
                <div className="list">
                    {
                    cards.sort((a,b) => sort =='more' ? b.price - a.price : sort == 'less' ? a.price - b.price : '').filter(el => el.name.toLowerCase().includes(filter?.name?.toLowerCase())).map((item) => (
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
        </div>
       
    )
}

export default Catalog;