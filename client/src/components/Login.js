import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { emailValidate, passwordValidate } from '../helper/validate';
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        const url = "http://localhost:8080/api/auth";
        const response = await axios.post(url, values);
        sessionStorage.setItem("token", response.data.data);
        if (sessionStorage.getItem("token")) {
          window.location = "/home";
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    }
  });

  return (
    <div className={styles.appBg}>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='back mt-12 flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center'>
              <img src={logo} className={styles.profile_img} alt="avatar" width={"150px"} height={'50px'} />
            </div>
            <div className="title flex justify-center">
              <span className='text-xl text-center text-gray-500'>
                Welcome to Digitalflake Admin
              </span>
            </div>
            <div className='py-8'>
              <div className='py-1'>
                <label className="block text-gray-700 text-base text-left font-bold" htmlFor="email">
                  Email ID
                </label>
                <div className='textbox flex flex-col items-center'>
                  <input type='email' name="email" onChange={formik.handleChange} value={formik.values.email} className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none' id='email' />
                  {formik.touched.email && formik.errors.email && <div className={styles.error_msg}>{formik.errors.email}</div>}
                </div>
              </div>
              <div className='py-1'>
                <label className="block text-gray-700 text-base text-left font-bold" htmlFor="password">
                  Password
                </label>
                <div className='textbox'>
                  <div className='flex flex-col items-center'>
                    <input name="password" type='password' onChange={formik.handleChange} value={formik.values.password} className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none' id='password' />
                    {formik.touched.password && formik.errors.password && <div className={styles.error_msg}>{formik.errors.password}</div>}
                    {error && <div className={styles.error_msg}>{error}</div>}
                  </div>
                  <div className='text-right'>
                    <Link className='text-gray-600' to="/forgotPassword">Forgot Password?</Link>
                  </div>
                  <div className='pt-5'>
                    <button className='bg-purple-900 text-gray-50  py-3 px-6 w-full rounded-lg hover:bg-purple-700 focus:outline-none' type='submit'>Log In</button>
                  </div>
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
  );
}
