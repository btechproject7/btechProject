import React from 'react'
import Layout from '../components/layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact-us"}>
    <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="images/contactus.jpg"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about website feel free to call anytime we 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> :  subhayan2904@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 8011402484
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 6000492698 
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact