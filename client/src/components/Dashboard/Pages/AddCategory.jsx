import React, { useState} from 'react'
import { Select, Option } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../../register.module.css";
import { Link } from 'react-router-dom';
import { PlusSquareOutlined } from '@ant-design/icons';

export default function AddCategory() {
   const navigate = useNavigate();
   const [error, setError] = useState("");
  const [data, setData] = useState({
		categoryName: "",
		description: "",
		status: "",
	});

  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
 
  const handleOptionChange = (value) => {
    setData({ ...data, status: value });
  };

  const handleSubmit = async (e) => {
		e.preventDefault();
    
    console.log("Input data:", data);
		try {
      const token = sessionStorage.getItem("token");
			const url = "http://localhost:8080/api/category/addCategory";
      const config = {
        headers : {
          Authorization : `Bearer ${token}`
        }
      };
			const { data: res } = await axios.post(url, data, config);
      alert(res.message);
      setData({
        categoryName: "",
        description: "",
        status: ""
      });
			//navigate("/home");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) 
      {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <div>
  <h1 className="text-2xl font-bold mb-4"><PlusSquareOutlined style={{marginRight:"10px"}}/>AddCategory</h1>
  {error && <div className={styles.error_msg1} >{error}</div>}
  <form className= "container" onSubmit={handleSubmit}>
  <div class="w-72 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8" style={{ flexDirection: window.innerWidth <= 768 ? 'column' : '', display:'flex', alignItems: 'center'}}>

    <div class="relative w-full min-w-[300px] h-10" style={{maxWidth: '100%', marginBottom: '1rem'}}>
      <input type="text" name="categoryName" onChange={handleChange} value={data.categoryName} 
        class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-1 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        placeholder=" " />
      <label
        class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Category Name
      </label>
    </div>
    <div class="relative w-full min-w-[300px] h-10" style={{maxWidth: '100%', marginBottom: '1rem'}}>
      <input
       type="text" name="description" onChange={handleChange} value={data.description} 
        class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-1 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        placeholder=" " />
      <label
        class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Description
      </label>
    </div>
    
    <div class="relative w-full min-w-[300px] h-10" style={{maxWidth: '100%', marginBottom: '1rem'}}>
            <Select
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-1 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              onChange={handleOptionChange}
              name="status"
              value={data.status}
              required
            >
              <Option name='status' value='active'>Active</Option>
              <Option name='status' value='inactive'>Inactive</Option>
            </Select>
            <label
              class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Status
            </label>
    </div>


 
  </div>
  <div className="flex justify-end mt-8" style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <Link to="/home/categories" className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md">Cancel</Link>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
      </div>

  </form>
  
</div>


  )
}
