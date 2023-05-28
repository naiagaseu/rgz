import React, { useState, useContext, useEffect} from 'react';
import { groups } from '../../Groups';
import { useParams } from 'react-router-dom';
import { CustomContext } from '../../Context';
import {useForm} from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { categories } from '../../Category';

const EditPost = () =>
{
    const param = useParams();
    const [category, setCategory] = useState(false);
    const {user, filter, setFilter, product} = useContext(CustomContext);
    const [mem, setMem] = useState([])
    const [post, setPost] = useState({})
    const [select, setSelect] = useState('');
    const [choose, setChoose] = useState('');

    const getPost = () => {
        product.map(item => 
            {
                if (item.id == param.id)
                {
                    setPost(item)
                }
        })

    }


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

    useEffect(() => {
        getPost()
        getMem()
    }, {})


    const{
        handleSubmit,
        register,
        reset
    } = useForm()

    const changePostHandler = (data) => {
        axios.patch(`http://localhost:8080/posts/${post.id}`, {
            name: data.name.length ? data.name : post.name,
            description: data.description.length ? data.description : post.description,
            image: data.image.length ? data.image : post.image,
            member: data.member.length ? data.member : post.member,
            group: data.group.length ? data.group : post.group,
            price: data.price.length ? data.price : post.price,
            creator: user,
            category: select.length ? select : post.category,
            choice: choose.length ? choose : post.choice,
        }).then((res)=> {
            reset()
            setCategory(false)
            setSelect('')
            setChoose('')
            navigate('/myaccount')
        }).catch((err)=>alert(err))
            
    }


    return(
        <div className="">
            <p className=''>Редактировать объявление</p>
             <form className="changeProduct" onSubmit={handleSubmit(changePostHandler)}>
                <div className="photoDiv">
                    <div className='photoChange'> 
                            <div className="chhosePic">
                                <p className="chooseCat">Выберите фото</p>
                                <input {...register('image')} type="text" className="appaddpic" defaultValue={post.image}/>
                            </div>
                            <img alt="" className="postPic" src={post.image}/>
                        </div>
                </div>
            <div className=""></div>
            <div className="addLeft">
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
                                className="groupList"  defaultValue={post.group}>
                                <option value="" className="optionNull">выбрать</option>
                            {
                                
                                groups.map(item =>
                                    <option className="listChoose" value={item.name}>{item.name}</option>
                                    )
                            } </select> 

                            <button onClick={()=>getMem()} type="button" className='submit'>подтвердить</button>
                            
                            <select name="" id="" {...register('member')} className="groupList" defaultValue={post.member}>
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
                <div className="addRightPost">
                    <p className="addName">Название товара</p>
                    <input {...register('name')} type="text" className="appaddname" defaultValue={post.name}/>
                    <p className="proddescripton">Описание</p>
                    <textarea {...register('description')} className="appadddescr" defaultValue={post.description}></textarea>
                    <p className="prodcost">Цена</p>
                    <input {...register('price')} type="text" className="appaddcost" defaultValue={post.price}/>
                    <p><button className="postprod" type='submit'>Сохранить</button></p>
                </div>
            
        </form>
        </div>
       
    )
}

export default EditPost;