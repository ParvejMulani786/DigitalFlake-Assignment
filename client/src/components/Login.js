import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { emailValidate } from '../validate/validate';
import { passwordValidate } from '../validate/validate';



export default function Login() {
  const formik = useFormik({
    initialValues:{
      email : '',
      password : '',
    },
    validate: emailValidate, passwordValidate,
    
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values);
    }

  })
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className=' back mt-12  flex justify-center item-center h-screen'>
        <div className={styles.glass}>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center '>
                  <img src={logo} className={styles.profile_img} alt="avatar" width={"150px"} height={'50px'} />
              </div>
              
              <div className="title flex justify-center">
              <span className=' text-xl text-center text-gray-500'>
              Welcome to Digitalflake Admin
              </span>
              </div>
              <div className='py-8'>

              <div className='py-1'>
              {/* <label for='email'>Email ID</label> <br></br> */}
              <label class="block text-gray-700 text-base text-left font-bold " for="email">
              Email ID
              </label>
              <div className='textbox flex flex-col items-center'>
              
                <input {...formik.getFieldProps('email')} className={styles.textbox} id='email' type='text' placeholder='Enter Email ID'></input>
              </div>
              </div>

              <div className='py-1'>
              {/* <label for='password'>Password</label> <br></br> */}
              <label class="block  text-gray-700 text-base text-left font-bold " for="email">
              Password
              </label>
              <div className='textbox  '>
                
                <div className='flex flex-col items-center'>
                <input {...formik.getFieldProps('password')} type='password' className={styles.textbox} id='password' placeholder='Enter Password'></input>
                </div>
                <div className='text-right'>
                <Link className='text-gray-600' to="/forgotPassword">Forgot Password?</Link>
                </div>
                <button className={styles.btn} type='submit'>Log In</button>
               
                
              </div>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-600'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>
              </div>

          </form>

          </div>
      </div>
    </div>
  )
}
