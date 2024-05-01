import React from 'react'
import { Outlet, Routes, Route,BrowserRouter as Router, RouterProvider } from 'react-router-dom';

/** Import all components */
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/Reset';
// import PageNotFound from './components/PageNotFound';
// import Home from './components/Dashboard/Home';
import Home from './components/Dashboard/Home';
import Dashboard from './components/Dashboard/Pages/Dashboard';
import Categories from './components/Dashboard/Pages/Categories';
import Products from './components/Dashboard/Pages/Products';

export default function App() {
    const user = sessionStorage.getItem("token");
  return (
    
    <Router>
    <Routes>
        <Route path='/' element={<Outlet/>}>
        <Route index element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        {user &&
         <Route path='/home/*' element={<Home/>}></Route>
         }
         
         </Route>
    </Routes>
    </Router>
    
  )
}
