import React, { useState, useEffect } from 'react'
import { AiFillAppstore, AiFillDashboard, AiOutlineAntDesign  } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink , useLocation } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import './Home.css';
import Header from './Header';


export default function Sidebar({children}) {
   
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setOpen(window.innerWidth <= 768); // Adjust the threshold as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const toggle = ()=> setOpen(!isOpen);
    const menuItem = [
        {
            path:"/home",
            name:"Dashboard",
            icon: <AiFillDashboard />
        },
        {
            path:"/home/categories",
            name:"Categories",
            icon:<AiFillAppstore/>
        },
        {
            path:"/home/products",
            name:"Products",
            icon:<AiOutlineAntDesign/>
        },
    ];



  return (
    <div className='container'>
        <div style={{width: isOpen ? "50px" : "230px"}} className='sidebar'>
            
            <div className='top_section'>
            <div className='logo'> 
            <img src={logo} alt="avatar"  />
            </div>
                <div className="bars">
                    <GiHamburgerMenu onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item, index) =>(
                    <NavLink to={item.path} key={index} className="link" 
                    // activeClassName={item.path === "/home" ? "" : "active"}
                    >
                       
                        <div className="icon">{item.icon}</div>
                        <div className="link_text">{item.name}</div>

                    </NavLink>
                ))
            }
        </div>
             <Header/>
            <main>{children}</main>
        </div>
    
    
  )
}
