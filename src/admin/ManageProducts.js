import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

export const ManageProducts = () => {

    const [ products, setProducts ] = useState([]);

    const { user, token } = isAuthenticated();

    const preLoad = () => {
        return (
            getAllProducts()
            .then( data => {
                if(data.error){
                   console.log(data.error)
                } else {
                   return setProducts(data)
                }
            })
        )
    }

    useEffect( () => {
        preLoad()
    }, [])

    const deleteProducts = (productId) => {
        
        deleteProduct(productId, user._id, token )
        .then( data => {
            if(data.error) {
                console.log(data.error)
            } else {
                preLoad();
            }
        })
    }

 return(
    <Base title="PRODUCT MANAGEMENT PAGE" description="MANAGE PRODUCTS HERE">
        <Link className="btn-dark btn-md py-3 px-2 rounded mb-5 text-decoration-none" to={`/admin/dashboard`}>
            ADMIN HOME
        </Link>
        <div className="row mb-5">
            <div className="col-12">
                <h2 className="text-white mt-5 mb-5">TOTAL {products.length} PRODUCTS:</h2>

                
                {products && products.map((product, index) => {
                return (
                <div key= {index} className="row text-center mb-2 ">
                    <div className="col-4">
                        <h3 className="text-white text-left text-uppercase">{product.name}</h3>
                    </div>
                    <div className="col-4">
                        <Link
                        className="btn btn-success"
                        to={`/admin/product/update/${product._id}`}
                        >
                        UPDATE PRODUCT
                        </Link>
                    </div>
                    <div className="col-4">
                        <button onClick={() => {
                            deleteProducts(product._id)
                        }} className="btn btn-danger">
                        DELETE PRODUCT
                        </button>
                    </div>
                </div>
                )

                })}
                
            </div>
        </div>
  </Base>
 )
}


export default ManageProducts;