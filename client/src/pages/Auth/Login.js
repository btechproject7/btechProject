import React ,{useState} from 'react'
import Layout from '../../components/layout/Layout'
import toast  from 'react-hot-toast';
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {
    const [scholarid,setScholarid]=useState("");
    const [password,setPassword]=useState("");
    const [auth,setAuth]=useAuth();
    
    const navigate=useNavigate();
    const location=useLocation();

    //handleSubmit
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
          const res=await axios.post(`/api/v1/auth/login`,
          {scholarid,password});
          if(res && res.data.success){
              toast.success(res.data && res.data.message);
              setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
              })
              localStorage.setItem("auth",JSON.stringify(res.data));
              navigate(location.state||"/");
          }else{
              toast.error(res.data.message);
          }
      }catch(error){
          console.log(error);
          toast.error("something went wrong");
      }
  };

  return (
    <Layout title={"Login-Administration App"}>
    <div className="form-container" style={{ minHeight: "77vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          
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
          
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login