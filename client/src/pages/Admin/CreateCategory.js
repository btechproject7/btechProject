import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast  from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from "antd"

const CreateCategory = () => {
  const [categories,setCategories]=useState([]);
  const [name,setName]=useState("");
  const [open, setOpen] = useState(false);
  const [selected,setSelected]=useState(null);
  const [updatedName,setUpdatedName]=useState("");

  //handle form
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.post("/api/v1/category/create-category",{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error);
      toast.error("something went wrong in input form");
    }
  }


  //get all categories
  const getAllCategory=async()=>{
    try{
      const {data}=await axios.get("/api/v1/category/get-category");
      if(data?.success){
        setCategories(data?.category);
      }
    }catch(error){
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  }

  useEffect(()=>{
    getAllCategory();
  },[])

// handleUpdate(update category)
  const handleUpdate=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("")
        setOpen(false);
        getAllCategory();
      }else{
        toast.error(data.error);
      }
    }catch(error){
      toast.error("Something went wrong");
    }
  }

  // handleDelete(delete category)
  const handleDelete=async(id)=>{
    try{
      const {data}=await axios.delete(`/api/v1/category/delete-category/${id}`)
      if(data.success){
        toast.success(`${name} is deleted`);
        getAllCategory();
      }else{
        toast.error(data.error);
      }
    }catch(error){
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title={"Dashboard-Create category"}>
    <div className="container-fluid m-3 p-3">
    <div className="row">
        <div className="col-md-3">
        <AdminMenu/>
        </div>
        <div className="col-md-6">
        <h1>Manage Category</h1> 
        <div className="p-3 w-50">
          <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
        </div>
        <div className="w-75"> 
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
        <tbody>
            {categories?.map(c=>(
              <>
              <tr>
              <td key={c._id}>{c.name}</td>
              <td><button className="btn btn-primary ms-2" 
              onClick={()=>{setOpen(true);setUpdatedName(c.name);setSelected(c)}}>
              Edit
              </button>
              </td> 
              <td><button className="btn btn-dark ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button></td> 
              </tr>
              </> 
            ))}
          </tbody>
      </table>
        </div>
              <Modal onCancel={()=>setOpen(false)} footer={null} open={open}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
              </Modal>
        </div>
    </div>
    </div>
    </Layout>
  )
}

export default CreateCategory