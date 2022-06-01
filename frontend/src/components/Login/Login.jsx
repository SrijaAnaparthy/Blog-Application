import React  from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch,useSelector } from "react-redux";
import { getUsers } from "../../features/userdetails/UserDetailsSlice";

export default function Login()
{
    const dispatch=useDispatch();
    const [temp,setTemp]=React.useState(0);
    const users=useSelector((state)=>{return state.UsersReducer.users[0]})
    React.useEffect(()=>{
        dispatch(getUsers());
    },[])
    const errorSchema=yup.object().shape({
        username:yup
        .string()
        .required('username is required'),
        password:yup
        .string()
        .required('password required')
    })
    const check=useFormik({
        initialValues:{username:'',password:''},
        validationSchema:errorSchema,
        onSubmit:checkdetails
    })
    function checkdetails(values)
    {
        var flag=0;
        users && users.map((user,i)=>{
            if(user.username==values.username && user.password==values.password)
            {
                flag=1;
                localStorage.setItem('user',user.username);
            }
        })
        var u=localStorage.getItem('user')
        if(flag==1 && u)
        {
        window.location.href="https://chandrika-blog-application.herokuapp.com/home"
        }
        else{
            window.location.href="https://chandrika-blog-application.herokuapp.com/"
        }
    }
    return(
        <div className="mt-5">
            <div className="d-flex justify-content-around">
                <div className="p-5 m-5">
                    <h4 className="m-5 p-5" style={{color:'#52ab98'}}><h1 style={{color:'#2b6777'}}>Welcome</h1>Blogging is not rocket science.<br/>It's about being yourself and <br/>putting what you have into it.</h4>
                </div>
                <div style={{width:'480px',height:'400px'}} className="mx-auto card p-5 mt-5 shadow round">
                    <h1 className="mb-4" style={{color:'#2b6777'}}>Login</h1>
                    <form onSubmit={check.handleSubmit}>
                        <input type="text" placeholder="Enter username" className="form-control" {...check.getFieldProps('username')}></input>
                        <span style={{color:'red'}}>
                            {check.touched.username && check.errors.username}
                        </span>
                        <input type="password" placeholder="Enter Password" className="form-control mt-4" {...check.getFieldProps('password')}></input>
                        <span style={{color:'red'}}>
                            {check.touched.password && check.errors.password}
                        </span><br/>
                        <button className="btn mb-3 mt-1" style={{backgroundColor:'#2b6777',color:'white'}}>Login</button><br/>
                        <span>Don't Have an Account? </span><Link to='/register'>Register</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}