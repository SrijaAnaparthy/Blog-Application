import React from 'react';
import { Link } from 'react-router-dom';
import './EachPost.css'

export default function EachPost(props)
{
    const [comment,setComment]=React.useState('');
    return(
        <div className='boxshadow mt-2' >
            <div class="card p-3" style={{backgroundColor:'fff'}}>
                <Link to={`/user/${props.post.user}`} style={{textDecoration:'inherit',color:'black'}}>
                <h5 style={{backgroundColor:'#f2f2f2',}} className="p-3 rounded">
                <i class="bi bi-person-circle me-2"></i>{props.post.user}
                </h5>
                </Link>
            <div class="card-body">
                <h5 class="card-title" style={{color:'#2b6777'}}>{props.post.title}</h5>
                <h6 class="card-text" style={{color:'#52ab98'}}>{props.post.content}</h6>
            </div>
            <img class="card-img-bottom" src={props.post.postimagesrc} alt="Card image cap" style={{width:'580px'}}></img>
            <div className="d-flex mt-3">
                 <i class="bi bi-hand-thumbs-up-fill success" style={{color:'green'}} onClick={()=>{props.likesinc(props.postindex)}}></i>
                 <span className="me-5">{props.post.likescount}</span>
                 <i class="bi bi-hand-thumbs-down-fill ms-5" style={{color:'red'}} onClick={()=>{props.dislikeinc(props.postindex)}}></i>
                 <span>{props.post.dislikesCount}</span>
                </div>
                 <div className="d-flex mt-3">
                <input type="text" placeholder="comment..." className="form-control" onChange={(e)=>{setComment(e.target.value)}}/>
               <button className="btn  ms-2"  style={{backgroundColor:'#2b6777',color:'white'}} onClick={()=>{props.comments(props.postindex,comment)}}> Comment </button></div>
                 <div  className='ms-3'>
                 {
                    props.post.comments.map((comment,i)=>
                    {
                        return(
                            <div><span>{comment}</span></div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}