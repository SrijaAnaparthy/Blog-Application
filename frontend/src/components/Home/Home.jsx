import React from 'react';
import {Link} from 'react-router-dom';
import MyFeed from '../MyFeed/MyFeed';
import MySpace from '../MySpace/MySpace';
import SponseredAds from '../Sponsered/SponseredAds';
import { useDispatch,useSelector } from "react-redux";
import { getUsers } from "../../features/userdetails/UserDetailsSlice";
import './Home.css'

export default function Home()
{
    const [u,setU]=React.useState();
    const dispatch=useDispatch();
    const [temp,setTemp]=React.useState(0);
    const users=useSelector((state)=>{return state.UsersReducer.users[0]})
    React.useEffect(()=>{
        dispatch(getUsers());
    },[])
    function search()
    {
        var flag=0;
        users && users.map((user,i)=>{
            if(user.username==u)
            {
                flag=1;
            }
        })
        if(flag==1)
        {
        window.location.href=`https://chandrika-blog-application.herokuapp.com/user/${u}`
        }
        else{
            window.location.href="https://chandrika-blog-application.herokuapp.com/home"
        }
    }
    return(
        <div style={{margin:'0px'}}>
            <div style={{position:'fixed',width:'100%',zIndex:'9999'}}>
            <div className='d-flex  mb-4 p-2  text-light' style={{backgroundColor:'#2b6777',}}>
                <div>
                <div class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search User" aria-label="Search" onChange={(e)=>{setU(e.target.value)}}/>
                <button class="btn btn-outline-light" onClick={search}>Search</button>
                </div>
                </div>
                <Link to="/home" className="link my-auto" style={{color: '#ffffff',textDecoration: 'inherit',cursor: 'pointer',fontWeight: 'bold',marginLeft:'400px',}}><h5>My Feed</h5></Link>
                <Link to="/" className='link my-auto' style={{color:'#fff',textDecoration:'inherit',cursor: 'pointer',fontWeight: 'bold',marginLeft:'620px'}} onClick={()=>{localStorage.removeItem('user')}}><h5><i class="bi bi-box-arrow-left me-2"></i>Logout</h5></Link>
            </div>
            </div>
       
        <div className='row'>
        <div className='mt-3'></div>
           <div className='col-sm-3 mt-5'>
               <MySpace/>
           </div>
            <div className='col-sm-5 mx-auto mt-5'>
                <MyFeed/>
            </div>
            <div className='col-sm-2 mx-auto mt-5'>
                <SponseredAds/>
            </div>
            </div>
        </div>
    )
}