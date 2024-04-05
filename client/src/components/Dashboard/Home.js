
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Image, Layout, Menu } from "antd";
import { UserOutlined, ProductOutlined, AppstoreOutlined,  HomeOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import "./Dashboard.css";
import logo from '../../assets/logo2.png';


import Sider from "antd/es/layout/Sider";

const Home = () => {
  
    return (  
        <>
      
      <div> 
        <Header/>
      </div>
              <div style={{ display: 'flex', flexDirection:'row'}}>
               
              <SideMenu />
              <Content />
              </div>
        
        </>);
}

function SideMenu(){

  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));


  const nav = useNavigate();

  const vuser = user;

  console.log(user);
  
  

  return(
    <>
      <div >
         <Layout style={{ minHeight: '100vh' }}>
          <Sider width={200}>
        < Menu
        mode="vertical" theme="dark" defaultSelectedKeys={['1']}
        style={{paddingRight:'1rem'}}
        onClick={({key}) =>{
          if( key === "signout"){
              
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('user');
              
              nav("/");

          }
          else{
            nav(key,{state: vuser});
          }
        
            
        }}
          items ={[
           
            {label : "Home", key: "/home" , icon: <HomeOutlined />},
            
            {label : "Categories", key: "/home/categories",  icon: <AppstoreOutlined /> },
            
            {label : "Products",key: "/home/products",   icon:<ProductOutlined />},
           
          ]}>
        </Menu>
        </Sider>
          </Layout>
        </div>
        
    </>
  )
}

function Content() {
  const [Header, setHeader] = useState(false)
  const location = useLocation();
  
  useEffect(()=> {
          console.log("useffect called");
         setHeader(location.pathname === "/home")
  },[location])
  
  return (
      <div>
          {Header ? <HomePage/> : <Outlet />}
      </div>
  )
}

function Header(){
  const handleLogout = () => {
    // Clear local storage
    sessionStorage.clear();
    window.location.href = '/';
  };
  return(
    <>
    <div className="logo relative">
      <Image src={logo} ></Image>
      <div className="logOut absolute top-0 right-0 pt-5 pr-4 item-center">
       
      <Link  onClick={handleLogout}><UserOutlined /></Link>
      </div>
    </div>
    
    </>
  )
}
 
export default Home;