import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addPost } from '../../../features/posts/PostsSlice';
import {Link} from 'react-router-dom';

export default function AddPost()
{
    const dispatch=useDispatch();
    const [file, setFile] = React.useState();
    const [fileName, setFileName] = React.useState("");
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
    const errorsSchema=yup.object().shape({
        title:yup.string().required('requied'),
        content:yup.string().required('required')
    })
    const postdetails=useFormik({
        initialValues:{title:'',content:''},
        validationSchema:errorsSchema,
        onSubmit:post,
    })
    function post(values)
    {
        console.log(values);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append('title',values.title);
        formData.append('content',values.content);
        formData.append('user',localStorage.getItem('user'))
        console.log(formData);
        dispatch(addPost(formData));
        window.location.href="https://chandrika-blog-application.herokuapp.com/home"
    }
    return(
        <div>
            <div className='d-flex  p-1' style={{backgroundColor:'#2b6777',}}>
         <Link to="/home" className='my-auto' style={{textDecoration:'inherit',color:'white'}}><h4><i class="bi bi-house-door-fill ms-2"></i></h4></Link>
         <h2 style={{color:'white'}} className="mx-auto">Add Post</h2>
         <div className='d-flex'> 
         <h5 className='my-auto me-3' style={{color:'#fff'}}><i class="bi bi-person-circle me-2"></i>{localStorage.getItem('user')}</h5>
         <Link to="/" className='link my-auto me-2' style={{color:'#fff',textDecoration:'inherit',cursor: 'pointer',fontWeight: 'bold'}} onClick={()=>{localStorage.removeItem('user')}}><h5><i class="bi bi-box-arrow-left me-2"></i>Logout</h5></Link>
         </div>
         </div>
        <div className='card shadow round m-5 p-5 mx-auto' style={{width:'450px'}}>
            {/* <h2 className='mb-4'>Add Post</h2> */}
            <div style={{width:'300px'}}>
            <form onSubmit={postdetails.handleSubmit}>
                <input type="text" className="form-control" placeholder='enter Title' {...postdetails.getFieldProps('title')}/>
                <span style={{color:'red'}}>
                    {postdetails.touched.title && postdetails.errors.title}
                </span>
                <textarea placeholder="enter post Content...!" className="form-control mt-3" {...postdetails.getFieldProps('content')}></textarea>
                <span style={{color:'red'}}>
                    {postdetails.touched.content && postdetails.errors.content}
                </span>
                <input type="file" className="form-control mt-3" onChange={saveFile} required/>
                <button className='btn mt-4' style={{backgroundColor:'#2b6777',color:'white'}}>Post</button>
            </form>
            </div>
            </div>
        </div>
    )
}