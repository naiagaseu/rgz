import { Route, Routes } from "react-router-dom";
import './App.css'
import Home from './Pages/Home/Home';
import Product from './Pages/Product/Product';
import AddProduct from './Pages/AddProduct/AddProduct';
import MyAccount from './Pages/MyAccount/MyAccount';
import AnotherAcc from './Pages/AnotherAcc/AnotherAcc';
import Header from './Layout/Header/Header';
import Catalog from './Pages/Catalog/Catalog';
import Albums from './Pages/Catalog/CatflogAlbums';
import LightSticks from './Pages/Catalog/CatalogLight';
import MakeUp from './Pages/Catalog/CatalogMakeUp';
import Items from './Pages/Catalog/CatalogItems';
import EditPost from "./Pages/MyAccount/EditPost";
import { useEffect, useContext } from "react";
import { CustomContext } from "./Context";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {

  const {getUserFromLS} = useContext(CustomContext);
  useEffect(()=> {
    getUserFromLS()
  }, [])


  return (
    <div className="body">
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/myaccount' element={<MyAccount/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/anotheraccount/:id' element={<AnotherAcc/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/catalog/cards' element={<Catalog/>}/>
        <Route path='/catalog/albums' element={<Albums/>}/>
        <Route path='/catalog/lightsticks' element={<LightSticks/>}/>
        <Route path='/catalog/makeup' element={<MakeUp/>}/>
        <Route path='/catalog/items' element={<Items/>}/>
        <Route path='/edit/:id' element={<EditPost/>}/>
      </Routes>
    </div>
  );
}

export default App;
