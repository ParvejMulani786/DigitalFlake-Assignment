import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { emailValidate } from '../helper/validate';

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues:{
      email : '',
    },
    validate: emailValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);
    }
  });

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex  justify-center items-center h-screen'>
        <div className='bg-gray-100 rounded-lg shadow-lg p-8 w-full max-w-lg'>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center mb-4'>
              <h2 className='text-xl text-center text-purple-900 font-bold'>
                Recovery
              </h2>
            </div>
            <div className="title py-3 flex justify-center">
              <p className='text-lg text-center text-gray-500'>
                Enter OTP sent to your email address.
              </p>
            </div>
            <div >
              <div className='py-1'>
                <label className="block text-gray-700 text-base font-bold" htmlFor="email">
                  Email Address
                </label>
                <div className='textbox'>
                  <input {...formik.getFieldProps('email')} type='email' className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none' id='email' placeholder='Enter Email' />
                </div>
              </div>
              <div className='flex justify-center mt-4'>
                <button className='bg-purple-900 text-gray-50 py-3 px-6 w-full rounded-lg hover:bg-purple-700 focus:outline-none' type='submit'>Request reset link</button>
              </div>
              <div className='py-4 text-center underline'>
                <Link className='text-gray-600' to="/">Back to log in</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
