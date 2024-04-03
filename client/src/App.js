import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** Import all components */
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Home from './components/Dashboard/Home';
import Reset from './components/Reset';

/* root router */ 
const router = createBrowserRouter([
    {
        path:'/',
        element:<Login></Login>
    },
    {
        path:'/register',
        element:<Register></Register>
    },
    {
        path:'/forgotPassword',
        element:<ForgotPassword></ForgotPassword>
    },
    {
        path:'/resetPassword',
        element:<Reset></Reset>
    },
    {
        path:'/home',
        element:<Home></Home>
    },
    {
        path:'*',
        element:<PageNotFound></PageNotFound>
    },
])
export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
    
  )
}
