import React, {useState, useContext} from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import { CustomContext } from '../../Context';
import Popup from 'D:/test/coursework/src/components/Popup/Popup.jsx'

const Header = () =>
{
    const {user, setUser, setFilter} = useContext(CustomContext);
    const [popup, setPopup] = useState(false);
    const logOut = () => {
      localStorage.removeItem('user')
      setUser({})
    }

    return(
        <header className='main'>
          <div className='top'>
              <div className='logo'>
              <Link className="link" to='/'>
                  <h3><span className='U'>U</span>Collect</h3>
                  <p className='drop'>drop your money</p>
              </Link>
              </div>
              <div className='userInfo'>
                {/* <img className='iconSmall'src={user.photo}/> */}
                {
            
                  user.email ? <div className='block'>
                    <img className='iconSmall'src={user.photo}/>
                    <span className='userName'><Link to='myaccount'>{user.name}</Link> <Link to="/"><button onClick={() => logOut()} type='button' className='userExit'>Выйти</button></Link></span> 
                    </div>: <span onClick={() => setPopup(true)} className='userName'>YourName</span>
                }
                
              </div>
              {
                  popup && <Popup setPopup={setPopup} popup={popup}/>
              }
            </div>
       

        <div className='btns'>
          <Link className='link' to='/catalog/cards'><button className='colorBtn' onClick={()=>setFilter({
            group : '',
            members: [],
            member: '',
            type: '',
            choice: '',
            name:''
          })}>карты</button></Link>
          <Link className='link' to='/catalog/albums'><button className='colorBtn' >альбомы</button></Link>
          <Link className='link' to='/catalog/lightsticks'><button className='colorBtn' >лайтстики</button></Link>
          <Link className='link' to='/catalog/makeup'><button className='colorBtn' >косметика</button></Link>
          <Link className='link' to='/catalog/items'><button className='colorBtn'>прочее</button></Link>
        </div>


      </header>
    )
}

export default Header;