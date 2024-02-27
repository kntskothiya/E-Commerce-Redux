import React from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { removeFromCart, updateQuantity } from "../services/module/action";
import axios from '../utils/axios';
import { cartURL } from "../config/url";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";

const Cart = ({ productinfo, removeFromCart, updateQuantity }) => {
  const clothdata = productinfo.data;

  const deleteproduct = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(itemId);

        axios.delete(`${cartURL}/${itemId}`)
          .then(response => {
            console.log("Deleted...");
          })
          .catch(error => {
            console.log(error)
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your product has deleted.",
          icon: "success"
        });
      }
    });
  };

  const changequantity = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
    console.log("cart id is ",itemId);
  };

  const total = clothdata.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div>
        {clothdata.map((item) => (
          <div className="d-flex justify-content-evenly" key={item.id}>
            <div className="mt-5 mb-5">
              <img src={item.image} alt="Not Found" height={"200px"} />
            </div>
            <div style={{ marginTop: "80px" }}>
              <h5>Type : {item.type}</h5>
              <h5>Price : ₹ {item.price}</h5>
              <h5 className="d-flex align-items-center">
                Quantity :{' '}
                <FaMinusCircle
                  className="me-2 ms-1"
                  onClick={() => changequantity(item.id, item.quantity - 1)}
                />
                <span>{item.quantity}</span>
                <FaPlusCircle
                  className="ms-2"
                  onClick={() => changequantity(item.id, item.quantity + 1)}
                />
              </h5>
              <h5> Amount : ₹ {item.price * item.quantity}</h5>
              <button className="btn btn-danger" onClick={() => deleteproduct(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <h3 className="d-flex justify-content-center">Total : ₹ {total} </h3>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productinfo: state.info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (itemId) => dispatch(removeFromCart(itemId)),
    updateQuantity: (itemId, newQuantity) => dispatch(updateQuantity(itemId, newQuantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);