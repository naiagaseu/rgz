import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import trashbask from '../../../img/trashback.png'
import { CustomContext } from '../../../Context';
import {useForm} from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Profile()
{
    const {user, setUser} = useContext(CustomContext);
    const navigate = useNavigate();

    const{
        handleSubmit,
        register,
        reset
    } = useForm()

    const delAcc = () => {
        if(window.confirm("Удалить аккаунт?")){
            localStorage.removeItem('user')
            setUser({})
            axios.delete(`http://localhost:8080/users/${user.id}`)
            navigate('/')
            axios.get(`http://localhost:8080/posts?creator.id=${user.id}`)
            .then(({data}) => {
                if (data.length !=0 ){
                    axios.delete(`http://localhost:8080/posts?creator.id=${user.id}`)
                }
            })
        }
    }

    const updateUser = (data) => {
        axios.patch(`http://localhost:8080/users/${user.id}`, {
            name: data.name.length ? data.name : user.name,
            email: data.email.length ? data.email : user.email,
            about: data.about.length ? data.about : user.about,
            photo: data.photo.length ? data.photo : user.photo,
            networks: data.networks.length ? data.networks : user.networks
        }).then((res) => {
            axios(`http://localhost:8080/posts?creator.id=${res.data.id}`)
            .then((json) => json.data.forEach((item) => {
                axios.patch(`http://localhost:8080/posts/${item.id}`, {
                    creator: res.data
                }).then(()=>{
                    setUser(res.data)
                    localStorage.setItem('user', JSON.stringify(res.data))
                })
            }))
            alert("Данные успешно изменены!")

             setUser(res.data)
             localStorage.setItem('user', JSON.stringify(res.data))



        })
    }

    return(
        <div className='profile'>
            <p className='profileTextTop'>Личная информация</p>
            <form action="" onSubmit={handleSubmit(updateUser)}>
                 <div className="cont">
                <div className="rightInfoChange">
                        <p className='profileText'>Фото профиля</p>
                        <div className="profilePicChange">
                            <img src={user.photo} alt="" className="profilePic" />
                            <input className="inputProf" type="text" {...register('photo')} defaultValue={user.photo}/>
                            <img className="trashPic" src={trashbask} />
                        </div>
                        <p className='profileText'>Мое имя</p>
                        <input className="inputProf" {...register('name')} type="text" defaultValue={user.name}/>
                        <p className='profileText'>Почта</p>
                        <input className="inputProf" {...register('email')} type='email' defaultValue={user.email}/>
                        <p className='profileText'>Соцсети для связи</p>
                        <input className="inputProf" {...register('networks')} type='text' defaultValue={user.networks}/>
                        {/* <p className='profileText'>О себе</p>
                        <textarea className="profileDecr" {...register('about')} type="text" defaultValue={user.about}/>
                        <button className="saveChanges" type="submit">Сохранить</button>
                        <button className="delAcc" type="button">Удалить профиль</button> */}
                </div>
                <div className="leftInfoChange">
                    <p className='profileText'>О себе</p>
                        <textarea className="profileDecr" {...register('about')} type="text" defaultValue={user.about}/>
                        <button className="saveChanges" type="submit">Сохранить</button>
                        <button className="delAcc" type="button" onClick={() => delAcc()}>Удалить профиль</button>
                    {/* <p className='profileText'>Смена пароля</p>
                    <p className='profileText__Small'>Старый пароль</p>
                    <input className="inputProf" type="text" />
                    <p className='profileText__Small'>Новый пароль</p>
                    <input className="inputProf" type="text" />
                    <p className='profileText__Small'>Повторите пароль</p>
                    <input className="inputProf" type="text" />
                    <button className="savePassw" type="button">Изменить пароль</button> */}
                </div>
            </div>

           
            </form>
           
        </div>
    )
}

export default Profile;