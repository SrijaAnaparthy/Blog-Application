import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addad } from '../../../features/ads/AdsSlice';
export default function AddAd()
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
        description:yup.string().required('required'),
        price:yup.string().required('price is required')
    })
    const postdetails=useFormik({
        initialValues:{title:'',description:'',price:''},
        validationSchema:errorsSchema,
        onSubmit:add,
    })
    function add(values)
    {
        console.log(values);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append('title',values.title);
        formData.append('description',values.description);
        formData.append('price',values.price);
        formData.append('user',localStorage.getItem('user'));
        dispatch(addad(formData));
        window.location.href="http://localhost:3000/home"

    }
    return(
        <div>
            <div className='d-flex  p-1' style={{backgroundColor:'#2b6777',}}>
            <Link to="/home" className="my-auto" style={{textDecoration:'inherit',color:'white'}}><h4><i class="bi bi-house-door-fill ms-2"></i></h4></Link>
            <h2 style={{color:'white'}} className="mx-auto">Add Advertisements</h2>
            <div className='d-flex' >
                <h5 className='my-auto me-3' style={{color:'#fff'}}><i class="bi bi-person-circle me-2"></i>{localStorage.getItem('user')}</h5>
            <Link to="/" className='link my-auto me-2' style={{color:'#fff',textDecoration:'inherit',cursor: 'pointer',fontWeight: 'bold'}} onClick={()=>{localStorage.removeItem('user')}}><h5><i class="bi bi-box-arrow-left me-2"></i>Logout</h5></Link>
            </div>
            </div>
        <div className='card shadow round m-5 p-5 mx-auto' style={{width:'450px'}}>
            {/* <h2 className='mb-4'>Add Ads</h2> */}
            <div style={{width:'300px'}}>
            <form onSubmit={postdetails.handleSubmit}>
                <input type="text" className="form-control" placeholder='enter Ad Title' {...postdetails.getFieldProps('title')}/>
                <span style={{color:'red'}}>
                    {postdetails.touched.title && postdetails.errors.title}
                </span>
                <textarea placeholder="description about ad.." className="form-control mt-3" {...postdetails.getFieldProps('description')}></textarea>
                <span style={{color:'red'}}>
                    {postdetails.touched.description && postdetails.errors.description}
                </span>
                <input type="text" className="form-control mt-3" placeholder='Enter Price' {...postdetails.getFieldProps('price')}/>
                <span style={{color:'red'}}>
                    {postdetails.touched.price && postdetails.errors.price}
                </span>
                <input type="file" className="form-control mt-3" onChange={saveFile} required/> 
                <button className='btn mt-4' style={{backgroundColor:'#2b6777',color:'white'}}>Post Add</button>
            </form>
            </div>
        </div>
        </div>
    )
}