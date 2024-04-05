import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar, handleMenuClick }) => {
  return (
    <div className={`fixed z-10 top-0 left-0 w-64 bg-gray-800 h-full text-white transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <h1 className="text-lg font-bold">Company Name</h1>
      </div>
      <ul className="p-2">
        <li className="py-2 px-4 cursor-pointer hover:bg-gray-700" onClick={() => handleMenuClick('home')}>Home</li>
        <li className="py-2 px-4 cursor-pointer hover:bg-gray-700" onClick={() => handleMenuClick('categories')}>Categories</li>
        <li className="py-2 px-4 cursor-pointer hover:bg-gray-700" onClick={() => handleMenuClick('products')}>Products</li>
      </ul>
    </div>
  );
};

export default Sidebar;
