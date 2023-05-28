import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CustomContext } from '../../Context';
import { v4 as uuidv4 } from 'uuid';
import CommentItem from '../../components/CommentItem';

const Product = () =>
{
    const param = useParams();
    const [productCard, setProductCard] = useState({});
    const {user} = useContext(CustomContext);
    const [add, setAdd] = useState(false);
    const [comment, setComment] = useState('');
    const [getComments, setGetComments] = useState([]);
    const [feedback, setFeedBack] = useState({
        text:'',
        status: false,
        id: ''
    });

    const [userCont, setUserCont] = useState([]);

   const getRequest = () => {
        axios.get(`http://localhost:8080/posts/${param.id}`)
            .then(({data}) => {
                setProductCard(data)
                setUserCont(data.creator)
                setGetComments(data.comment)
                console.log(productCard.comment)
            })
   }

    const addComment = () => {
        if (comment.length > 1) {
            axios.patch(`http://localhost:8080/posts/${param.id}`, {
            comment: [...productCard.comment, {
                id: uuidv4(),
                text: comment,
                creator: user,
                feedback: feedback.status ? productCard.comment.find(item => item.id === feedback.id) : {}
            }]
        })
        .then(()=> {
            setAdd(false)
            setComment('')
            getRequest()
            setFeedBack({
                text:'',
                status: false,
                id: ''
            })
        })
        }
        else {
            alert("минимальная длина комментария 2 символа :)")
        }
    }

    const deleteComment = (id) => {
        axios.patch(`http://localhost:8080/posts/${param.id}`, {
            comment: getComments.filter(item => item.id !== id)
        }).then(()=> {
            getRequest()
        })
    }


    useEffect(()=>{
        getRequest()
    }, [])


    return(
        <div className='product'>
            <div className='productLink'>
                <Link className='link'to='/'>Главная</Link> - <span>Объявление</span>
            </div>
         <div className="product-container">
            <div className="product-left">
                <img className='productPic' src={productCard.image} />
            </div>
            <div className="product-right">
                <div className="r-left">
                     <p className="product-right-name">{productCard.name}</p>
                     <p className="product-right-choice">категория: {productCard.choice}</p>
                <p className="product-right-descr">{productCard.description}</p>
                <p className="product-right-price">{productCard.price} руб.</p>
                
                </div>
                <div className="r-right">
                <Link className='link' to={`/anotheraccount/${userCont.id}`}>
                    <div className="usrInf">
                        <img className="profPic" src={userCont.photo} alt="" />
                        <div className="prodUserDescr">
                            <p className="usrName">{userCont.name}</p>
                            <p className="usrNet">{userCont.networks}</p>
                        </div>
                    </div>
                </Link>
                    <div className='commentList'>
                    {
                            getComments.map(item => 
                                <CommentItem item={item} deleteComment={deleteComment} 
                                setAdd={setAdd} feedback={feedback} setFeedBack={setFeedBack}/>
                            )
                        }
                    </div>
                    {
                        feedback.status && <div className="answerTo"><p className='textToAnswer'>{feedback.text}</p>
                        <button className='cancelAnswer' onClick={()=> {setFeedBack({
                            sttaus: false,
                            text: '',
                            id:''
                        })
                        setAdd(false)}}>X</button>
                        </div>
                    }
                    {
                        add ? <textarea valuse={comment} onChange={(e)=> setComment(e.target.value)} className='commentArea'></textarea> : ''
                    }
                    <button className="productSave" type="button" onClick={() => {
                        if (user.email === undefined) {
                            alert("необходима регистрация")
                        } else if (add == true){
                            addComment()
                        } else {
                            setAdd(true)}
                        }}>
                        Добавить комментарий</button>

                </div>

            </div>
         </div>
        </div>
    )
}

export default Product;