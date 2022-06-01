import React from "react";
import { Link } from "react-router-dom";

export default function MySpace()
{
    return(
        <div style={{color:'#2b6777'}}>
             <div className='ms-3'>
                <div style={{position:'fixed'}}>
                <h5 className='mb-5 mt-3'><i class="bi bi-person-circle me-2"></i>{localStorage.getItem('user')}</h5>
                <h5 className='mb-5'>
                <Link to="/addpost"  style={{color:'#2b6777',textDecoration:'inherit'}}><i class="bi bi-plus-circle-fill me-2"></i>Add Post</Link>
                </h5> 
                <h5 className='mb-5'>
                <Link to="/addad"  style={{color:'#2b6777',textDecoration:'inherit',}}><i class="bi bi-badge-ad me-2"></i>Add Promotion</Link>
                </h5>
                <h5 className='mb-5'>
                <Link to="/myposts"  style={{color:'#2b6777',textDecoration:'inherit',}}><i class="bi bi-bag-fill me-2"></i>My Posts</Link>
                </h5> 
                </div> 
            </div>
        </div>
    )
}