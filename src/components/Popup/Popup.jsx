import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { CustomContext } from '../../Context';

const Popup = ({popup, setPopup}) =>
{
    const {setUser} = useContext(CustomContext);
    const [status, setStatus] = useState('signIn');

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const popupClose = (e) => {
        if(e.target.classList.contains('overlay')){
            setPopup(false);
        }
    };

    const signInHandler = (data) => {
        axios.post('http://localhost:8080/login', data).then((res) => {
            setPopup(false)
            setUser(res.data.user)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            reset()
        })

    };

    const signUpHandler = (data) => {
        axios.post('http://localhost:8080/users', {
            ...data,
            posts:[],
            about:"",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7wrKjpbjvQzLHlQfvKO8gsopOJBvbCEXe1A&usqp=CAU",
            favourite:[],
            networks:""
        }).then((res)=>{
            setUser(res.data.user)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            setPopup(false)
            reset()
        }).catch(err => alert(err))
    }


    return(
        <div onClick={(e) => popupClose(e)} className={`overlay $(popup && overlay__active)`}>
            <div className='popup'>
                <form onSubmit={status === 'signIn' ? 
                    handleSubmit(signInHandler) : handleSubmit(signUpHandler)} 
                    className='popup__form'>
                    <div className='popup__logo'>
                        <Link className="link" to='#'>
                            <h3><span className='U'>U</span>Collect</h3>
                        <p className='drop'>drop your money</p>
                        </Link>
                    </div>
                    <div className='popup__top'>
                        <h2 onClick={()=>setStatus('signIn')} className={`popup__title ${status==='signIn'&& 'popup__title-active'}`}>Вход</h2>
                        <h2 onClick={()=>setStatus('signUp')} className={`popup__title ${status==='signUp'&& 'popup__title-active'}`}>Регистрация</h2>
                    </div>
                    <input {...register('email')} placeholder='Email' className='popup_input' type="email"/>
                    {
                        status === 'signUp' && <input {...register('name')}placeholder='Имя' className='popup_input' type='text'/>
                    }
                    <input {...register('password', {
                        pattern: {
                            value : /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                            message: 'Пароль должен содеражть минимум 8 символов, заглавные буквы и символы "0-9"'
                        }

                    })}placeholder='Пароль' className='popup_input' type='password'/>
                    <p style={{marginBottom:'10px'}}>{errors?.password?.message}</p>
                    <button className='popup_button' type='submit'>{status === 'signIn' ? 'Войти' : 'Регистрация'}</button>
                </form>

            </div>
        </div>
    )
}

export default Popup;