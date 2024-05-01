import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Categories.css';
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { AiFillAppstore,  AiFillEdit, AiFillDelete } from 'react-icons/ai';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';

export default function Categories() {
  const nav = useNavigate();
  const[showEditForm, setShowEditForm] = useState(false);
  const[showDeleteForm, setShowDeleteForm] = useState(false);
  const[editCategoryId, setEditCategoryId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
 

  // State to hold categories data
  const [categories, setCategories] = useState([]);
  
  // State to hold search term
  const [searchTerm, setSearchTerm] = useState('');


  const refreshPage = () => {
    // Increment the key to force a re-render of the component
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Fetch categories data from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get('http://localhost:8080/api/category/categories', config);
        setCategories(response.data.data.reverse());
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [refreshKey]);


  


  // Function to handle changes in search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table columns configuration
  const columns = [
    { name: "Id", selector: row => row._id, sortable: true },
    { name: "Category", selector: row => row.categoryName, sortable: true },
    { name: "Description", selector: row => row.description, sortable: true },
    { name: "Status", selector: row => row.status, sortable: true },
    {
      name: "Actions",
      cell: row => (
        <>
        <div style={{fontSize:"20px", marginRight:"10px"}}><button onClick={() => handleEdit(row._id) }><AiFillEdit /></button></div>
         <div style={{fontSize:"20px"}}><button onClick={() => handleDelete(row._id)}><AiFillDelete /></button></div> 
          
        </>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  // Function to navigate to AddCategory page
  const handleAddCategory = () => {
    nav("/home/addCategory");
  };

  // Function to handle edit action
  const handleEdit = (id) => {
    console.log("id: "+ id);
    setEditCategoryId(id);
    setShowEditForm(true);
    // nav(`/home/editCategory/${id}`);
  };
  const handleDelete = (id) => {
    console.log("id: "+ id);
    setEditCategoryId(id);
    setShowDeleteForm(true);
    // nav(`/home/editCategory/${id}`);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleCloseDeleteForm = () => {
    setShowDeleteForm(false);
  };

  
  return (
    <div>
      
  <div className='flex items-center justify-between mt-5'>
  
    <div className='flex items-center '>
      <div style={{ fontSize: "24px", marginRight: "10px" }}><AiFillAppstore /></div>
      <div style={{ fontSize: "24px" }}><h2><b>Categories</b></h2></div>
    </div>
    <div className='text-center'>
      <input style={{ height: "35px", border: "1px solid #ccc", minWidth: '350px', borderRadius: "5px", paddingLeft: "5px", marginRight: "10px", textSize: "2px" }} type='text' placeholder='Search by category' value={searchTerm} onChange={handleSearch} />
    </div>
    <div className='btn'>
      <button className='AddButton' onClick={handleAddCategory}>Add New</button>
    </div>
  </div>
  <div className='mt-5'>
    <div className="datatable-container">
      <DataTable
        columns={columns}
        data={filteredCategories}
        selectableRows
        
        pagination
        customStyles={{
          headRow: {
            style: {
              fontWeight: "bold",
              fontSize: "16px",
              backgroundColor: "#FFFACD"
            }
          }
        }}
      />
    </div>
  </div>
  {showEditForm && (
        <div className="popup-card">
          <div className="popup-content">
            <EditCategory id={editCategoryId} onClose={handleCloseEditForm} refreshPage={refreshPage} />
          </div>
        </div>
      )}
  {showDeleteForm && (
        <div className="popup-card">
          <div className="popup-content">
            <DeleteCategory id={editCategoryId} onClose={handleCloseDeleteForm} refreshPage={refreshPage} />
          </div>
        </div>
      )}
</div>

  );
}
