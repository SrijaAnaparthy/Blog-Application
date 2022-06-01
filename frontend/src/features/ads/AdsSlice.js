import { createSlice } from "@reduxjs/toolkit";

const adSlice=createSlice({
    name:'ads',
    initialState:{
        ads:[],
    },
    reducers:{
        loadAds:(state,action)=>{
            state.ads=[];
            state.ads.push(action.payload);
        }
    }
})
export function getads()
{
    return(dispatch)=>{
        fetch('https://chandrika-blog-application.herokuapp.com/getads')
        .then(res=>res.json())
        .then(data=>dispatch(loadAds(data)))
    }
}
export function addad(newad)
{
    console.log('newad')
    return(dispatch)=>{
        fetch('https://chandrika-blog-application.herokuapp.com/addad',{
            method:'POST',
            body:newad
        })
        .then(()=>{dispatch(getads())})
    }
}

export const {loadAds} =adSlice.actions;
export default adSlice.reducer;