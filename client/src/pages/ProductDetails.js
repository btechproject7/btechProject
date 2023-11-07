// import React,{useState,useEffect} from 'react'
// import Layout from '../components/layout/Layout'
// import axios from "axios";
// import { useParams } from 'react-router-dom';

// const ProductDetails = () => {
//     const params=useParams();
//     const [product,setProduct]=useState({});
//     //initial p details
//     useEffect(()=>{
//        if(params?.slug) getProduct();
//     },[params?.slug])
//     //get product
//     const getProduct=async()=>{
//         try{
//             const {data}=await axios.get(`/api/v1/product/single-product/${params.slug}`)
//             setProduct(data?.product);
//         }catch(error){
//             console.log(error);
//         }
//     }
//   return (
//     <Layout>
//     <div className="row container mt-2 product-details">
//         <div className="col-md-6">
//         <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" 
//         alt={product.name} height="500" width={"350px"}/>
//         </div>
//         <div className="col-md-6 product-details-info">
//             <h1 className="text-center">Product Details</h1>
//             <h4>Name: {product.name}</h4>
//             <h4>Price: Rs: {product.price}/-</h4>
//             <h4>Category: {product?.category?.name}</h4>
//             <h4>Description: {product.description}</h4>
//             <button class="btn btn-secondary ms-2">Add to cart</button>
//         </div>
//     </div>
//     </Layout>
//   )
// }

// export default ProductDetails