import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { getPosts} from "../../../features/posts/PostsSlice";
import { Link } from "react-router-dom";

export default function SelectedUserPosts()
{
    const username=useParams().username;
    const dispatch=useDispatch();
    const posts=useSelector((state)=>{return state.PostsReducer.posts[0]});
    React.useEffect(()=>{
        dispatch(getPosts());
    },[])

    return(
        <div>
            <div className="d-flex p-1" style={{backgroundColor:'#2b6777',}}>
            <Link to="/home" style={{textDecoration:'inherit',color:'white'}}><h4><i class="bi bi-house-door-fill ms-3"></i></h4></Link>
            <h2 className="mx-auto" style={{color:'white'}}>{username} Posts</h2>
            </div>
            <div className="d-flex justify-content-around flex-wrap mt-4" >
            {
                posts&&posts.map((post,i)=>{
                    if(post.user==username)
                    {
                        return(
                            <div>
                            <div class="card p-3" style={{width:'620px'}}>
                            <div class="card-body">
                            <h4 class="card-title">{post.title}</h4>
                            <p class="card-text">{post.content}</p>
                            </div>
                            <img class="card-img-bottom" src={`https://chandrika-blog-app-backend.herokuapp.com/${post.postimagesrc}`} alt="Card image cap" style={{width:'580px'}}></img>
                            <div className="d-flex mt-3">
                                <i class="bi bi-hand-thumbs-up-fill success" style={{color:'green'}} ></i>
                                <span className="me-5">{post.likescount}</span>
                                <i class="bi bi-hand-thumbs-down-fill ms-5" style={{color:'red'}} ></i>
                                <span>{post.dislikesCount}</span>
                                </div>
                                <div className="d-flex mt-3">
                                <input type="text" placeholder="comment..." className="form-control" />
                            <button className="btn ms-2" style={{backgroundColor:'#2b6777',color:'white'}}> Comment </button></div>
                                <div  className='ms-3'>
                                {
                                    post.comments.map((comment,i)=>
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
                })
            }
            </div>
        </div>
    )
} 