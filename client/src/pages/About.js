import React from 'react'
import Layout from '../components/layout/Layout'

const About = () => {
  return (
    <Layout title={"About-us"}>
    <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/aboutus.webp"
            alt="contactus"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-4">
        <h1 className="text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            We, students of National Institute of Technology,Silchar are pursuing our Btech 
            in Electronics and Communication branch. We built this website to facilitate the 
            communication between students and admin. Our aim is to reduce the effort and 
            provide a smooth and hassale free solution to everyone.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About;