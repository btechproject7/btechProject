import React from "react";
import Layout from "./../components/layout/Layout";
import "../styles/Homepage.css";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate=useNavigate();

  return (
    <Layout title={"Home-Administration App"}>
     {/* <img
        src="/images/nits.png"
        className="nit-img"
        alt="nitimage"
        width={"100%"}
      /> */}
      <div className="second-part">
        <h2 className="text-center pt-4 service">SERVICES AVAILABLE</h2>
        <div className="d-flex flex-wrap text-center p-3">
                 {/* 1st card */}
                <div className="card m-4 p-2" style={{ width: "18rem" }}>
                  <img
                    src="/images/result.jpg"
                    className="card-img-top"
                    alt="result"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Check Results</h5>
                    <p className="card-text">check your result by your credentials confidentially.</p>  
                    <button className="btn btn-warning ms-2 c-btn" onClick={()=>navigate("/results")} > CHECK </button>
                  </div>
                </div>
                {/* 2nd card */}
                <div className="card m-4 p-2" style={{ width: "18rem" }}>
                  <img
                    src="/images/bonafide.png"
                    className="card-img-top"
                    alt="bonafide"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Get Your Bonafide</h5>
                    <p className="card-text">Get your bonafide certificate hassale free within time.</p>  
                    <button className="btn btn-warning ms-2 c-btn" onClick={()=>navigate("/bonafide")} > GET </button>
                  </div>
                </div>
                {/* 3rd card */}
                <div className="card m-4 p-2" style={{ width: "18rem" }}>
                  <img
                    src="/images/hostel.avif"
                    className="card-img-top"
                    alt="hostel"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Hostel Management</h5>
                    <p className="card-text">File your issues and complaints to the superviser for smooth action.</p>  
                    <button className="btn btn-warning ms-2 c-btn" onClick={()=>navigate("/hostel")}> COMPLAIN </button>
                  </div>
                </div>
                {/* 4th card */}
                <div className="card m-4 p-2 " style={{ width: "18rem" }}>
                  <img
                    src="/images/announcement.webp"
                    className="card-img-top"
                    alt="bonafide"
                  />
                  <div className="card-body">
                    <h5 className="card-title">General Announcements</h5>
                    <p className="card-text">Get notifications and announcements from time to time.</p>  
                    <button className="btn btn-warning ms-2 c-btn" onClick={()=>navigate("/announcement")}> SEE </button>
                  </div>
                </div>
      </div>
      </div>
    </Layout>
  );
};

export default HomePage;