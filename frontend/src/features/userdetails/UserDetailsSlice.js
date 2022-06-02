import { createSlice } from "@reduxjs/toolkit";

const userdetailsSlice=createSlice({
    name:'users',
    initialState:{
        users:[]
    },
    reducers:{
        loadUsers:(state,action)=>{
            state.users=[];
            state.users.push(action.payload);
        }
    }
})
export function getUsers()
{
    return(dispatch)=>{
        fetch('https://chandrika-blog-app-backend.herokuapp.com/data')
        .then(res=>res.json())
        .then(data=>dispatch(loadUsers(data)))
    }
}

export function addUser(newuser)
{
    console.log('newuser',newuser)
    return(dispatch)=>{
        fetch('https://chandrika-blog-app-backend.herokuapp.com/adduser',{
            method:'POST',
            body:JSON.stringify(newuser),
            headers: {
                'Content-Type': 'application/json'
                }
        })
        .then(()=>dispatch(getUsers()))
    }
}

export const {loadUsers}=userdetailsSlice.actions;
export default userdetailsSlice.reducer;