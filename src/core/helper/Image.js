import React from "react";
import { API } from "../../backend";

const Image = ({ product }) => {
    const imageUrl = product 
    ? `${API}/product/photo/${product._id}` 
    : `https://images.unsplash.com/photo-1529736576495-1ed4a29ca7e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`;

    return (
        <img src= {imageUrl}
             alt="photo"
            //  style={{ maxHeight: "100%", maxWidth: "100%" }}
             className="card-img-top rounded-0"/>
    )
}

export default Image