import React, { useState, useContext} from 'react';
import { categories } from '../../Category';
import { groups } from '../../Groups';
import axios from "axios";
import {useForm} from "react-hook-form"
import { CustomContext } from '../../Context';
import { useNavigate } from 'react-router-dom';

const AddProduct = () =>
{
    const [category, setCategory] = useState(false);
    const [select, setSelect] = useState('');
    const [choose, setChoose] = useState('');
    const {user, filter, setFilter} = useContext(CustomContext);
    const [mem, setMem] = useState([])

    const navigate = useNavigate();

    const getMem = () => {
        groups.map(item =>
            {
                if (item.name == filter.group) 
                {
                    setMem(item.members)
                }
            })
    }

    const{
        handleSubmit,
        register,
        reset
    } = useForm()

    const addPostHandler = (data) => {
        axios.post('http://localhost:8080/posts', {
            ...data,
            creator: user,
            category: select,
            choice: choose,
            comment: []
        }).then((res)=> {
            reset()
            setCategory(false)
            setSelect('')
            setChoose('')
            navigate('/myaccount')
        }).catch((err)=>alert(err))
            
    }

    return(
        <form className="addproduct" onSubmit={handleSubmit(addPostHandler)}>
            <div className="addLeft">
                    <p className="addPics">Выберите фото</p>
                    <input {...register('image')} type="text" className="appaddpic"/>
                    <div>
                        <p className="chooseCat">Категория</p>
                        <button className="chsCat" type='button' onClick={() => {
                            setCategory(true)
                            setSelect('')
                            setChoose('')
                        }}>выбрать</button>
                        <ul style={{display: category ? 'block' : 'none'}}>
                            {
                                categories.filter(item => item.category.includes(select)).map(item =>
                                    <li className='catList'>
                                    <span onClick={() => setSelect(item.category)}>{item.category}</span>
                                    <ul style={{display: select ? 'block' : 'none'}}>
                                        {
                                            item.list.filter(el => el.category.includes(choose)).map(el => 
                                                <li className='catList' onClick={() => setChoose(el.category)}>{el.category}</li>
                                            )
                                            
                                        }
                                    </ul>
                                    </li>
                                    )
                            }
                        </ul>
                        <div className='groupMemb'>
                            <p className="chooseGroup">Группа</p>
                            <select {...register('group')} onChange={(e) => setFilter({...filter, group: e.target.value})}
                                className="groupList" value={filter.group} >
                                <option value="" className="optionNull" selected disabled>выбрать</option>
                            {
                                
                                groups.map(item =>
                                    <option className="listChoose" value={item.name}>{item.name}</option>
                                    )
                            } </select> 

                            <button onClick={()=>getMem()} type="button" className='submit'>подтвердить</button>
                            
                            <select name="" id="" {...register('member')} className="groupList">
                            <option value="" className="optionNull" selected disabled>выбрать</option>
                            {
                                mem.map(item =>
                                    <option className="listChoose" value={item}>{item}</option>
                                    )
                            }
                            </select>
                            <button onClick={()=>getMem()} type="button" className='submit'>подтвердить</button>

                        </div>
                </div>
  
                </div>
                <div className="addRight">
                    <p className="addName">Название товара</p>
                    <input {...register('name')} type="text" className="appaddname"/>
                    <p className="proddescripton">Описание</p>
                    <textarea {...register('description')} className="appadddescr"></textarea>
                    <p className="prodcost">Цена</p>
                    <input {...register('price')} type="text" className="appaddcost"/>
                    <p><button className="postprod" type='submit'>Опубликовать</button></p>
                </div>
            
        </form>
    )
}

export default AddProduct;