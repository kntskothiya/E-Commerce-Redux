import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { productURL, cartURL } from "../config/url";
import { addToCart, updateQuantity } from "../services/module/action";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";

const ProductDetail = ({ addToCart, updateQuantity }) => {
  const [clothInfo, setClothInfo] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${productURL}/${id}`)
      .then((result) => {
        setClothInfo(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${cartURL}/${id}`)
      .then((response) => {
        if (response.data) {
          setQuantity(response.data.quantity);
        } else {
          setQuantity(0);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [id]);

  const addProduct = () => {
    addToCart(clothInfo);
    axios
      .post(cartURL, { id: clothInfo.id, ...clothInfo })
      .then((response) => {
        console.log("added", response.data);
        setQuantity(1);
        Swal.fire({
          position: "top-end",
          width: "420px",
          icon: "success",
          title: "Prodcut added to cart",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        console.error("error", error);
      });
      // console.log("pd id is ", id);
    };

  const changequantity = (itemId, newQuantity) => {
    console.log("not working");
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
      setQuantity(newQuantity); 
      console.log("working");
    }
    console.log("pd id is ",itemId)
  };

  return (
    <>
      <div>
        {clothInfo ? (
          <div className="container mt-5 mb-3">
            <div className="row">
              <div className="col-md-12 col-lg-6 col-sm-12 mt-5 mb-5">
                <div>
                  <img src={clothInfo.image}
                    alt="Not Found"
                    width={"70%"}
                    height={"400px"}
                  />
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12 mt-5">
                <div>
                  <h2>{clothInfo.type}</h2>
                  <h6>Brand : {clothInfo.brand}</h6>
                  <h6>Color : {clothInfo.color}</h6>
                  <h6>Size : {clothInfo.size}</h6>
                  <h6>Price: ₹ {clothInfo.price}</h6>
                  <h6>Description : {clothInfo.description}</h6>
                </div>
                <div className="mt-5">
                  {quantity > 0 ? (
                    <div className="d-flex align-items-center">
                      <button className="me-5 btn btn-success">Buy Now</button>
                      <button className="btn btn-primary me-2" >
                        <FaMinusSquare className="fs-5" onClick={() => changequantity(clothInfo.id, quantity - 1)} />
                        {/* {console.log("pd cloth info.id is ",clothInfo.id)} */}
                         Quantity : {quantity} <FaPlusSquare className="fs-5" onClick={() => changequantity(clothInfo.id, quantity + 1)} /> </button>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <button className="me-5 btn btn-success">Buy Now</button>
                      <button
                        className="me-5 btn btn-warning"
                        onClick={addProduct}>
                        Add To Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default connect(null, { addToCart, updateQuantity })(ProductDetail);
