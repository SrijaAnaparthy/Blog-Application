import React from "react";
import EachPost from '../Posts/EachPost/EachPost';
import { useDispatch,useSelector } from 'react-redux';
import { getPosts,putpost } from '../../features/posts/PostsSlice';
import {Link} from 'react-router-dom';
import { getUsers } from "../../features/userdetails/UserDetailsSlice";

export default function MyFeed()
{
    const dispatch=useDispatch();
    const posts=useSelector((state)=>{return state.PostsReducer.posts[0]});
    const users=useSelector((state)=>{return state.UsersReducer.users[0]})
    React.useEffect(()=>{
        dispatch(getPosts());
        dispatch(getUsers());
    },[]);
    function likesinc(ind)
    {
        var obj={};
        posts&&posts.map((post,i)=>{
            if(i==ind)
            {
                obj={...post};
                obj.likescount=post.likescount+1;
            }
        })
        dispatch(putpost(obj));
    }
    function dislikeinc(ind)
    {
        var obj={};
        posts&&posts.map((post,i)=>{
            if(i==ind)
            {
                obj={...post};
                obj.dislikesCount=post.dislikesCount+1;
            }
        })
        dispatch(putpost(obj));
    }
    function comments(ind,comment)
    {
        var obj={};
        posts&&posts.map((post,i)=>{
            if(i==ind)
            {
                obj={...post};
                var temp=[...obj.comments];
                temp.push(comment);
                obj.comments=[...temp];
            }
        })
        dispatch(putpost(obj));
    }
    return(
        <div>
           <div className="d-flex">
               {/* {
                   users.map((user,i)=>{
                       if(user.username!=localStorage.getItem('user')){
                       return(
                           <div className="card p-3 mx-auto">
                               <h1 className="mx-auto"><i class="bi bi-person-circle me-2"></i></h1>
                               <h4>{user.username}</h4>
                               <Link to="/" className="mx-auto">Click</Link>
                           </div>
                       )
                       }
                   })
               } */}
           </div>
             {
               posts&&posts.map((post,i)=>{
                    if(post.user!=localStorage.getItem('user'))
                        {
                            return(
                                <div className='mb-4'>
                               <EachPost post={post} postindex={i} likesinc={likesinc} dislikeinc={dislikeinc} comments={comments}/>
                               </div>
                            )
                        }
                    })
                }
        </div>
    )
}