import React ,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../components/layout/Layout';
import toast  from 'react-hot-toast';
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';

import {useAuth} from "../context/auth";

const Login = () => {
    const [scholarid,setScholarid]=useState("");
    // const [password,setPassword]=useState("");
    const [auth,setAuth]=useAuth();
    const [result,setResult]=useState([]);
    const [subject,setSubjects]=useState([]);
    
    const navigate=useNavigate();
    const location=useLocation();

    //handleSubmit
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
          const {data}=await axios.post(`/api/v1/auth/results`, {scholarid});
          setResult(data.user);
          }
      catch(error){
          console.log(error);
          toast.error("something went wrong");
      }
  };

  const handleSubject=async(e)=>{
    try{
        const {data}=await axios.post(`/api/v1/auth/subjects`,{scholarid});
        setSubjects(data.userData);
    }catch(error){
      console.log(error);
      toast.error("something went wrong");
    }
  }

  return (
    <Layout title={"Login-Administration App"}>
    <div className="form-container" style={{ minHeight: "77vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">Enter your scholar id to see result</h4>
          
          <div className="mb-3">
            <input
              type="text"
              value={scholarid}
              onChange={(e) => setScholarid(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Scholar Id "
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary danger m-1" style={{width:"100%"}}>
            SEE RESULT
          </button>
        </form>
        <p className="m-2">* Please login in or register before seeing result</p>  
      </div>
      
      <div className="mt-3 p-3 border border-secondary">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Scholar Id</th>
      <th scope="col">Name</th>
      <th scope="col">Branch</th>
      <th scope="col">Semester</th>
      <th scope="col">SGPA</th>
      <th scope="col">CGPA(/10)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{result.scholarid}</th>
      <td>{result.name}</td>
      <td>{result.branch}</td>
      <td>{result.semester}</td>
      <td>{result.sgpa}</td>
      <td>{result.cgpa}</td>
    </tr>
  </tbody>
</table>
</div>
<div>
    <h4 className="m-3">Subject Wise Grades Distribution</h4>
    <button type="submit" className="btn btn-primary danger m-3" onClick={()=>handleSubject()}>Subject Wise</button>
    </div>
    
     

    <div className="mt-2 p-3 mb-3 border border-secondary">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Subject</th>
      <th scope="col">Grades</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{subject.subject1}</td>
      <td>{subject.marks1}</td>
    </tr>
    <tr>
      <td>{subject.subject2}</td>
      <td>{subject.marks2}</td>
    </tr>
    <tr>
      <td>{subject.subject3}</td>
      <td>{subject.marks3}</td>
    </tr>
    <tr>
      <td>{subject.subject4}</td>
      <td>{subject.marks4}</td>
    </tr>
    <tr>
      <td>{subject.subject5}</td>
      <td>{subject.marks5}</td>
    </tr>
    <tr>
      <td>{subject.subject5}</td>
      <td>{subject.marks5}</td>
    </tr>
  </tbody>
</table>
</div>

    </Layout>
  )
}

export default Login