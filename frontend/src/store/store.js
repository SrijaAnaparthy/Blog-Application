import {configureStore} from '@reduxjs/toolkit';
import UserDetailsReducer from '../features/userdetails/UserDetailsSlice';
import PostsReducer from '../features/posts/PostsSlice';
import AdsReducer from '../features/ads/AdsSlice';
const store=configureStore({
    reducer:{
        UsersReducer:UserDetailsReducer,
        PostsReducer:PostsReducer,
        AdsReducer:AdsReducer
    }
})

export default store;