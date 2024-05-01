import React from 'react'
import Sidebar from './Sidebar';
import { Outlet,BrowserRouter, Route, Routes  } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Categories from './Pages/Categories';
import Products from './Pages/Products';
import './Home.css';
import Header from './Header';
import AddCategory from './Pages/AddCategory';
import EditCategory from './Pages/EditCategory';

export default function Home() {
  
  return (
    <div >
    {/* <Header></Header> */}
    <Sidebar>
    <Routes>
        <Route index element={<Dashboard/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/addCategory' element={<AddCategory/>}></Route>
        <Route path="/editCategory/:id" element={<EditCategory/>} />
    </Routes>
    </Sidebar>
    </div>
  )
}
