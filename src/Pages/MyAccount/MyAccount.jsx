import React, {useState, useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import Profile from './Profile/Profile';
import MyPosts from './MyPosts';
import { CustomContext } from '../../Context';

const MyAccount = () =>
{
    const [profChange, setProfChang] = useState(false);
    const [mess, setMess] = useState(false);
    const [saved, setSaved] = useState(false);
    const [myprod, setMyprod] = useState(true);
    const {user, getAllFavs, fav, getAllProductsById} = useContext(CustomContext);
    
    useEffect(() => {
       // getAllFavs(user.id)
        getAllProductsById(user.id)
    }, [])


    function resetSet()
    {
        setProfChang(false);
        setMess(false);
        setSaved(false);
        setMyprod(true);
    }

    function showProfCh()
    {
        setProfChang(true)
        setMess(false);
        setSaved(false);
        setMyprod(false);
    }

    function showMySaved()
    {
        setProfChang(false)
        setMess(false);
        setSaved(true);
        setMyprod(false); 
        getAllFavs(user.id)
        
    }

    return(
        <div className="myaccwrapper">
            <div className="linkfromacc">
                 <Link className='link'to='/'>Главная</Link><span> - Личный кабинет</span>
            </div>
            <div className='myacc'>
            <div className="myaccleft">
                <div className="myaccbtn">
                    <button className={`myaccInfo ${profChange === true && 'btn_active'}`} onClick={() => showProfCh()}>Настройки профиля</button>
                    <button className={`myaccprod  ${myprod === true && 'btn_active'}`} onClick={() => resetSet()}>Мои объявления</button>
                    {/* <button className={`mysaved ${saved === true && 'btn_active'}`} onClick={() => showMySaved()}>Избранное</button> */}
                </div>
            </div>
            <div className="myaccright">
                <div className="myproducts">
                    {
                        profChange ? <Profile />  : <MyPosts /> 
                    }
                </div>
            </div>
            
        </div>
        </div>

    )
}

export default MyAccount;