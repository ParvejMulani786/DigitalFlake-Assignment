import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ForgotPassword.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { emailValidate } from '../validate/validate';
import { passwordValidate } from '../validate/validate';



export default function ForgotPassword() {
  const formik = useFormik({
    initialValues:{
    email : '',
    },
    validate: emailValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values);
    }

  })
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className=' mt-12  flex justify-center item-center h-screen'>
        <div className={styles.back}>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center '>
              <span className=' text-xl text-center text-purple-900 font-bold'>
              Did you forget your password?
              </span>
                  
              </div>
              
              <div className="title py-4 flex justify-center">
              <span className=' text-lg text-center text-gray-500'>
              Enter your email address and we'll send you a link to restore password
              </span>
              </div>
              <div className='py-8'>


              <div className='py-1'>
              {/* <label for='password'>Password</label> <br></br> */}
              <label class="block  text-gray-700 text-base ml-28 font-bold " for="email">
              Email Address
              </label>
              <div className='textbox '>
                
                <div className='flex flex-col items-center'>
                <input {...formik.getFieldProps('email')} type='email' className={styles.textbox} id='password' placeholder='Enter Email'></input>
                </div>
                <div className='flex flex-col items-center'>
                <button className={styles.btn} type='submit'>Request reset link</button>
                </div>
                <div className='py-4 text-center underline'>
                <Link className='text-gray-600' to="/">Back to log in</Link>
                </div>
                
              </div>
              </div>
               </div>

          </form>

          </div>
      </div>
    </div>
  )
}
