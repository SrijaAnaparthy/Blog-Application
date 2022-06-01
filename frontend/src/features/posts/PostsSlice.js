import { createSlice } from "@reduxjs/toolkit";


const postsSlice=createSlice({
    name:'posts',
    initialState:{
        posts:[]
    },
    reducers:{
        loadPosts:(state,action)=>{
            state.posts=[];
            state.posts.push(action.payload);
        }
    }
})
export function getPosts()
{
    return(dispatch)=>{
        fetch('https://chandrika-blog-application.herokuapp.com/getposts')
        .then(res=>res.json())
        .then(data=>dispatch(loadPosts(data)))
    }
}

export function addPost(newPost)
{
    console.log(newPost);
    return(dispatch)=>{
    fetch('https://chandrika-blog-application.herokuapp.com/addpost',{
      method:'POST',
      body:newPost,
    })
    .then(()=>dispatch(getPosts()))
}
}

export function deletepost(id)
{
    console.log(id);
    return(dispatch)=>{
        fetch(`https://chandrika-blog-application.herokuapp.com/deletepost/${id}`,{
            method:'DELETE'
        }).then(()=>dispatch(getPosts()))
    }
}
export function putpost(ob)
{
     console.log('ob',ob);
     return(dispatch)=>{
         fetch("https://chandrika-blog-application.herokuapp.com/putpost",{
        method:'PUT',
        body:JSON.stringify(ob),
        headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(()=>dispatch(getPosts()))
     }
}
export const {loadPosts}=postsSlice.actions;
export default postsSlice.reducer;