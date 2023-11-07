import React ,{useState} from 'react'
import Layout from '../../components/layout/Layout'
import toast  from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import "../../styles/AuthStyles.css";

const Otp = () => {
    const [phone,setPhone]=useState("");
    const [otp,setOtp]=useState("");
    
    const navigate=useNavigate();
    //handleSubmit
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post(`/api/v1/auth/otp`,
            {phone});
            if(res.data.success){
                toast.success(res.data.message);
                // navigate("/register");
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error("something went wrong");
        }
    }

    const handleSubmitSecond=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post(`/api/v1/auth/otpverify`,
            {otp});
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/register");
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
    <div className="form-container" style={{ minHeight: "20vh"}}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">VERIFY MOBILE</h4>
          <div className="mb-3">
            <input
              type="Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              placeholder="Enter Your Phone Number"
              required
              autoFocus
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            SEND OTP
          </button>
        </form>
        </div>

        <div className="form-container" style={{ minHeight: "20vh"}}>
        <form onSubmit={handleSubmitSecond}>
          {/* <h4 className="title">VERIFY MOBILE</h4> */}
          <div className="mb-3">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              placeholder="Enter the otp"
              required
              autoFocus
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
             VERIFY
          </button>
        </form>
        </div>
    </Layout>
  )
}

export default Otp