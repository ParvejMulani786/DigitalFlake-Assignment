import React, { useState, useEffect } from 'react';
import { Select, Option } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "../../register.module.css";
import { Link } from 'react-router-dom';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Input } from "@material-tailwind/react";

export default function EditCategory({ id, onClose, refreshPage  }) {
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

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleOptionChange = (value) => {
    setData({ ...data, status: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const url = `http://localhost:8080/api/category/updateCategoryById/${categoryId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data: res } = await axios.put(url, data, config);
      alert(res.message);
      refreshPage();
      handleCancel();
      
    } catch (error) {
      console.error('Error updating category:', error);
      setError("Error updating category");
    }
  };

  return (
    <div className="flex w-72 flex-col gap-6 m-15">
      <h1 className="text-2xl font-bold mb-4"><PlusSquareOutlined style={{ marginRight: "10px" }} />Edit Category</h1>
      <Input label="Category" 
      type="text" name="categoryName" onChange={handleChange} value={data.categoryName}/>
      <Input label="Description" 
       type="text" name="description" onChange={handleChange} value={data.description}/>
      <Select label="Status"
      onChange={handleOptionChange}
      name="status"
      value={data.status}>
        <Option value='active'>Active</Option>
        <Option value='inactive'>Inactive</Option>
      </Select>
      <div className="flex justify-end mt-8">
          <button  onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md">Cancel</button>
          <button onClick={handleSubmit} type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
         </div>
    </div>
    
  );
}
