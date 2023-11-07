import React ,{useState} from 'react'
import Layout from '../../components/layout/Layout'
import toast  from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [scholarid,setScholarid]=useState("");
    const [branch,setBranch]=useState("");
    const [phone,setPhone]=useState("");
    const [otp,setOtp]=useState("");

    const navigate=useNavigate();
    //handleSubmit
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post(`/api/v1/auth/register/otp`,
            {name,email,password,scholarid,branch,phone});
            if(res.data.success){
                toast.success(res.data.message);
                // navigate("/login");
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error("something went wrong");
        }
    }

    const handleOtp=async(e)=>{
      try{
          const res=await axios.post(`/api/v1/auth/register/otpverify`,{otp});
          if(res.data.success){
            toast.success(res.data.message);
          }else{
            toast.error(res.data.message);
          }
      }catch(error){
        console.log(error);
        toast.error("something went wrong");
      }
    }



  return (
    <Layout title={"Register-Administration App"}>
    <div className="form-container" style={{ minHeight: "80vh"}}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={scholarid}
              onChange={(e) => setScholarid(e.target.value)}
              className="form-control"
              id="exampleInputScholarid1"
              placeholder="Enter Your Scholar Id"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="form-control"
              id="exampleInputBranch1"
              placeholder="Enter Your Branch"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputBranch1"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            SEND OTP
          </button>
        </form>
        
           
        
        <form >
          
          <div className="mb-3">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Otp "
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={()=>handleOtp()}>
            VERIFY OTP
          </button>
        </form>
      </div>




    </Layout>
  )
}

export default Register