import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";

const Register = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
    console.log("Input data:", data);
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/">
						<button type="button" className={styles.white_btn}>
							Log in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;


// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import avatar from '../assets/profile.png';
// import toast, { Toaster } from 'react-hot-toast';
// import { useFormik } from 'formik';
// import { registerValidation } from '../helper/validate';
// // import convertToBase64 from '../helper/convert';
// import { registerUser } from '../helper/helper'


// import styles from '../styles/Login.module.css';

// export default function Register() {

//   const navigate = useNavigate()
//   // const [file, setFile] = useState()

//   const formik = useFormik({
//     initialValues : {
//       email: '',
//       username: '',
//       password : ''
//     },
//     validate : registerValidation,
//     validateOnBlur: false,
//     validateOnChange: false,
//     onSubmit : async values => {
//       values = await Object.assign(values, { profile : file || ''})
//       let registerPromise = registerUser(values)
//       toast.promise(registerPromise, {
//         loading: 'Creating...',
//         success : <b>Register Successfully...!</b>,
//         error : <b>Could not Register.</b>
//       });

//       registerPromise.then(function(){ navigate('/')});
//     }
//   })

//   // /** formik doensn't support file upload so we need to create this handler */
//   // const onUpload = async e => {
//   //   const base64 = await convertToBase64(e.target.files[0]);
//   //   setFile(base64);
//   // }

//   return (
//     <div className="container mx-auto">

//       <Toaster position='top-center' reverseOrder={false}></Toaster>

//       <div className='flex justify-center items-center h-screen'>
//         <div className={styles.glass} style={{ width: "45%", paddingTop: '3em'}}>

//           <div className="title flex flex-col items-center">
//             <h4 className='text-5xl font-bold'>Register</h4>
//             <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
//                 Happy to join you!
//             </span>
//           </div>

//           <form className='py-1' onSubmit={formik.handleSubmit}>
//               {/* <div className='profile flex justify-center py-4'>
//                   <label htmlFor="profile">
//                     <img src={file || avatar} className={styles.profile_img} alt="avatar" />
//                   </label>
                  
//                   <input onChange={onUpload} type="file" id='profile' name='profile' />
//               </div> */}

//               <div className="textbox flex flex-col items-center gap-6">
//                   <input {...formik.getFieldProps('firstName')} className={styles.textbox} type="text" placeholder='Email*' />
//                   <input {...formik.getFieldProps('lastName')} className={styles.textbox} type="text" placeholder='Password*' />
//                   <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
//                   <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password*' />
//                   <button className={styles.btn} type='submit'>Register</button>
//               </div>

//               <div className="text-center py-4">
//                 <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
//               </div>

//           </form>

//         </div>
//       </div>
//     </div>
//   )
// }

// // import React from 'react'

// // export default function Register() {
// //   return (
// //     <div>
// //       Register
// //     </div>
// //   )
// // }
