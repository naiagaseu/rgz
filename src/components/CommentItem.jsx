import React, {useContext, useState} from 'react';
import { CustomContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CommentItem= ({item, deleteComment, setAdd, feedback, setFeedBack}) =>
{
    const [answer, setAnswer] = useState(false);
    const {setUser, user} = useContext(CustomContext);
    const navigate = useNavigate();


    return(
        <li className='fullComment'>
            {
                item.feedback?.id && <div className="feedBack">
                    {
                        item.feedback.text
                    }
                </div>
            }
            <div className={`commentBLock ${answer ? 'commentBLock_active' : ''}`}>
                <img src={item.creator.photo} alt="" className='commentPic'
                onClick={(e)=> {
                    e.stopPropagation()
                    navigate(`/anotheraccount/${item.creator.id}`)
                }}/>
                <div className='commentCreator' onClick={() => setAnswer(true)}>
                    <p className='commentName'>{item.creator.name}</p>
                    <p className="commentText">{item.text}</p>
                    </div>
                    <div className='buttonsComment'>
                        {
                        user?.id === item.creator.id && <button className="delComment" onClick={(e) => {
                            e.stopPropagation()
                            deleteComment(item.id)}}>Удалить</button>
                    }
                    {
                        answer ? <button className="delComment" onClick={() => {
                            setFeedBack({
                                text: item.text,
                                status: true, 
                                id: item.id
                            })
                            setAdd(true)
                            setAnswer(false)
                        }}>Ответить</button> : ''
                    }
                    </div>
                    
                            
            </div>
        </li>
        
    )
}

export default CommentItem;