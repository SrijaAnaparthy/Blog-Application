import React from "react";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {addUser} from "../../features/userdetails/UserDetailsSlice"

function Register()
{
    const dispatch=useDispatch();
    const errorMessageSchema=yup.object().shape({
        firstname:yup
        .string()
        .min(5,'too short..!')
        .max(30,'too long..!')
        .required('firstname is required'),
        lastname:yup
        .string()
        .min(3,'too short..!')
        .max(20,'too long..!')
        .required('lastname is required'),
        username:yup
        .string()
        .min(4,'too short..!')
        .max(25,'too long..!')
        .required('username is required'),
        email:yup
        .string()
        .required('email is required'),
        // .checkmail('email already existed'),
        password:yup
        .string()
        .required('password is required')
        .min(4,'too short..!')
        .max(25,'too long..!'),
        confirmpassword:yup
        .string()
        .required('enter confirm-password')
        .oneOf([yup.ref('password'),null],'Password must match')
    })
    const details=useFormik({
        initialValues:{firstname:'',lastname:'',username:'',email:'',password:'',confirmpassword:''},
        validationSchema:errorMessageSchema,
        onSubmit:save,
    })
    function save(values)
    {
        dispatch(addUser(values))
        window.location.href="http://localhost:3000/"
    }
    return(
        <div style={{width:'550px'}} className="mx-auto card m-5 p-5 shadow round">
            <h1 className="mb-4" style={{color:'#2b6777'}}>Registration</h1>
            <form onSubmit={details.handleSubmit}>
                <input type="text" className="form-control" placeholder="First Name"  {...details.getFieldProps('firstname')}></input>
                <span style={{color:'red'}}>
                    {details.touched.firstname && details.errors.firstname}
                </span>
                <input type="text" className="form-control mt-3" placeholder="Last Name"  {...details.getFieldProps('lastname')}></input>
                <span style={{color:'red'}}>
                    {details.touched.lastname && details.errors.lastname}
                </span>
                <input type="text" className="form-control mt-3" placeholder=" Enter User Name" {...details.getFieldProps('username')}></input>
                <span style={{color:'red'}}>
                    {details.touched.username && details.errors.username}
                </span>
                <input type="email" placeholder="Enter Email " className="form-control mt-3"  {...details.getFieldProps('email')}></input>
                <span style={{color:'red'}}>
                    {details.touched.email && details.errors.email}
                </span>
                <input type="password" placeholder="Password " className="form-control mt-3" {...details.getFieldProps('password')}></input>
                <span style={{color:'red'}}>
                    {details.touched.password && details.errors.password}
                </span>
                <input type="password" placeholder="Confirm-Password " className="form-control mt-3" {...details.getFieldProps('confirmpassword')}></input>
                <span style={{color:'red'}}>
                    {details.touched.confirmpassword && details.errors.confirmpassword}
                </span><br/>
                <button className="mb-4 btn" style={{backgroundColor:'#2b6777',color:'white'}}>Register</button><br/>
                <span >Already Have an Account? </span><Link to='/'>Login</Link>
            </form>
        </div>
    )
}

export default Register;