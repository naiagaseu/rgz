import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const CustomContext = createContext()

export const Context = (props) => {
    const [user, setUser] = useState({});
    const[product, setProduct] = useState([]);
    const [fav, setFav] = useState([]);
    const [cards, setCards] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [lights, setLights] = useState([]);
    const [other, setOther] = useState([]);
    const [cosmetics, setCosmetics] = useState([]);
    const [filter, setFilter] = useState({
        group : '',
        members: [],
        member: '',
        choice: '',
        name:''
    })

    const [groupFilter, setGroupFilter] = useState({
        group:''
    })

    useEffect(()=> {
        getCards(filter)
    }, [])

    const getAllProduct = () => {
        axios.get(`http://localhost:8080/posts`)
        .then(({data}) => {
            setProduct(data)
        })
    }


    const getAllProductWithoutMine = () => {
        axios.get(`http://localhost:8080/posts?creator.id_ne=${user.id}`)
        .then(({data}) => {
            setProduct(data)
        })
    }

    
    const getCards = (filter, category) => 
    {
        axios.get(`http://localhost:8080/posts?category=${category}&${filter.group.length ? `group=${filter.group}` : ''}&${filter.member.length ? `member=${filter.member}` : ''}&${filter.choice.length ? `choice=${filter.choice}` : ''}&${filter.name.length ? `name=${filter.name}` : ''}`)
        .then(({data}) => {
            setCards(data)
    
        })
    }

    const getLights = (groupFilter) => 
    {
        axios.get(`http://localhost:8080/posts?category=лайтстик`)
        .then(({data}) => {
            setLights(data)
        })
    }

    const getAlbums = (groupFilter) => 
    {
        axios.get(`http://localhost:8080/posts?category=альбом`)
        .then(({data}) => {
            setAlbums(data)
        })
    }

    const getOthers = () => 
    {
        axios.get(`http://localhost:8080/posts?category=прочее`)
        .then(({data}) => {
            setOther(data)
        })
    }

    const getCosmetics = () => 
    {
        axios.get(`http://localhost:8080/posts?category=косметика`)
        .then(({data}) => {
            setCosmetics(data)
        })
    }

    const getAllProductsById = (id) => {
        axios.get(`http://localhost:8080/posts?creator.id=${id}`)
        .then(({data}) => {
            setProduct(data)
        })
    }


    const getAllFavs = (id) => {
        if(user.id == undefined){}
        else{
            axios.get(`http://localhost:8080/users?id=${id}`)
            .then(({data}) => {
            fav.splice(0,fav.length);
            data[0].favourite.map(it => {
                fav.push(it)
            })
        }
        )
    }
    }

    const getUserFromLS = () => {
        if (JSON.parse(localStorage.getItem('user'))!== null){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }

    const value = {
        user,
        setUser,
        product,
        getAllProduct,
        getUserFromLS,
        getAllProductWithoutMine,
        getAllProductsById,
        fav,
        getAllFavs,
        setFav,
        getCards, getLights, getAlbums, getOthers, getCosmetics,
        cards, lights, albums, other, cosmetics,
        filter, setFilter
    }

    return <CustomContext.Provider value = {value}>
        {
            props.children
        }
    </CustomContext.Provider>
}