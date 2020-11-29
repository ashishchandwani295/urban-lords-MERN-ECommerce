import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders } from "./helper/adminapicall";

export const ManageOrdersAdmin = () => {

    const [ orders, setOrders ] = useState([]);

    const { user, token } = isAuthenticated();

    const preLoad = () => {
        return (
            getAllOrders(user._id, token)
            .then( data => {
                if(data.error){
                   console.log(data.error)
                } else {
                   return setOrders(data)
                }
            })
        )
    }

    useEffect( () => {
        preLoad()
    }, [])

 return(
    <Base title="ORDER MANAGEMENT PAGE" description="MANAGE ALL ORDERS HERE">
        <Link className="btn-dark btn-md py-3 px-2 rounded mb-5 text-decoration-none" to={`/admin/dashboard`}>
            ADMIN HOME
        </Link>
        <div className="row mb-5">
            <div className="col-12">
                <h2 className="text-white mb-5 mt-5">TOTAL {orders.length} ORDERS:</h2>

                
                {orders && orders.map((order, index) => {
                return (
                <div key= {index} className="row text-center mb-2 ">
                    <div className="col-6">
                        {order.products.map((product, index)=> (
                            <h3 key={index} className="text-white text-left text-uppercase">{product.name}</h3>
                        ))}
                    </div>
                    <div className="col-6 text-right">
                        <Link
                        className="btn btn-success"
                        to={`/order/details/${order._id}`}
                        >
                        VIEW ORDER DETAILS
                        </Link>
                    </div>
                </div>
                )

                })}
                
            </div>
        </div>
  </Base>
 )
}


export default ManageOrdersAdmin;