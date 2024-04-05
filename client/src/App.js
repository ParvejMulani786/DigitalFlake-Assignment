import React from 'react'
import { Routes, Route,BrowserRouter as Router, RouterProvider } from 'react-router-dom';

/** Import all components */
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/Reset';
// import PageNotFound from './components/PageNotFound';
import Home from './components/Dashboard/Home';

export default function App() {
    const user = sessionStorage.getItem("token");
  return (
    
    <Router>
    <Routes>
        
        <Route path='/' exact element={<Login/>}></Route>
        <Route path='/register' exact element={<Register/>}></Route>
        <Route path='/forgotPassword' exact element={<ForgotPassword/>}></Route>
        {user && <Route path='/home' exact element={<Home/>}></Route>}
        
    </Routes>
    </Router>
    
  )
}
