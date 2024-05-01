import React, { useState, useEffect } from 'react';
import { Select, Option } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "../../register.module.css";
import { Link } from 'react-router-dom';
import { RestOutlined } from '@ant-design/icons';
import { Input } from "@material-tailwind/react";

export default function DeleteCategory({ id, onClose, refreshPage  }) {
  const navigate = useNavigate();
  // const { id } = useParams();
  const categoryId = id;
  const handleCancel = () => {
    onClose(); // Call onClose function passed from parent component
  };
  const [error, setError] = useState("");
  const [data, setData] = useState({
    categoryName: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const url = `http://localhost:8080/api/category/getCategoryById/${categoryId}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get(url, config);
        const { categoryName, description, status } = response.data.data;
        setData({ categoryName, description, status });
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };
    fetchData();
  }, [categoryId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = sessionStorage.getItem("token");
        const url = `http://localhost:8080/api/category/deleteCategoryById/${categoryId}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.delete(url, config);
        alert(response.data.message);
        refreshPage();
        handleCancel();
    } catch (error) {
        console.error('Error deleting category:', error);
        setError("Error deleting category");
    }
  };

  return (
    <div className="flex w-72 flex-col gap-6 m-15">
      <h1 className="text-2xl font-bold mb-4"><RestOutlined style={{ marginRight: "10px" }} />Delete Category</h1>
      <Input label="Category" 
      type="text" name="categoryName"  value={data.categoryName} readOnly/>
      <Input label="Description" 
       type="text" name="description"  value={data.description} readOnly/>
      <Select label="Status"
      
      name="status"
      value={data.status} readOnly>
        <Option value='active'></Option>
        
      </Select>
      <div className="flex justify-end mt-8">
          <button  onClick={handleCancel} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md">Cancel</button>
          <button onClick={handleSubmit} type="submit" className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md">Delete</button>
         </div>
    </div>
    
  );
}
