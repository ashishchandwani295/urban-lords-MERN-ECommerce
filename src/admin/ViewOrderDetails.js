import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { getAOrder } from "./helper/adminapicall";

const ViewOrderDetails = ({ match }) => {

    const [values, setValues] = useState({
        products: [],
        amount: "",
        status: "",
        error: "",
        getARedirect: ""
    });

    const { products, amount, status, error, getARedirect} = values;

    const { user, token } = isAuthenticated();


    const preLoad = (orderId) => {
        getAOrder(user._id, token, orderId)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                console.log(data.products)
                setValues({...values,
                    products: data.products,
                    amount: data.amount,
                    status: data.status,
                    error: false
                })
            }


        })
    };


    useEffect(() => {
        preLoad(match.params.orderId);
    }, []);

    

    const handleChange = status => event => {
        setValues({...values, [status]:event.target.value })
    };

    // const onSubmit = (event) => {

    //     event.preventDefault();
    //     setValues({...values, error: "", loading: true})

    //     updateProduct( match.params.productId, user._id, token, formData)
    //     .then( data => {
    //         if(data.error){
    //             setValues({...values, error: data.error})
    //         } else {
    //             setValues({...values, 
    //             name: "",
    //             description: "",
    //             price: "",
    //             photo: "",
    //             stock: "",
    //             formData: "",
    //             categories: [],
    //             loading: false,
    //             createdProduct: data.name})
    //         }
    //     })
    // };

    // const successMessage = () => {
    //     if(createdProduct){
    //     return (
    //         <div className="text-success">
    //             <h4>{createdProduct} updated successfully</h4>
    //         </div>
    //     )
    //     }
    // }

    // const ratingMessage = () => {
    //     if(error){
    //         return (
    //             <div className="text-danger">
    //             <h4> updation failed</h4>
    //             </div>
    //         )
    //     } else {
    //         return (
            
    //         <div className="text-success">
    //             <h4>{createdProduct} updated successfully</h4>
    //         </div>
    //         )
    //     }
    // }

    const createOrderForm = () => {
        return (
        <form className="mt-3">
            <div className="form-group">
                {products && ( products.map((product, index) => (
                    <input key="index" name="name" className="form-control text-uppercase" placeholder="Name" value={product.name} />
                )))}
            </div>
            <div className="form-group">
                <input name="amount" className="form-control text-uppercase" placeholder="Amount" value={"$" + amount} />
            </div>
            <div className="form-group">
                <input onChange={handleChange(status)} name="status" className="form-control text-uppercase" placeholder="Status" value={status} />
            </div>
      
            {user.role === 1 && (
            <button type="submit" onClick={() => {}} className="btn-info mb-4 mt-3">
                UPDATE STATUS
            </button>
            )}

        </form>
        )
    } 

    return(
        <Base title="ORDER DETAILS PAGE" description="VIEW YOUR ORDERS HERE" className="container bg-info p-4 mb-5">
            {user.role === 1 && (
                <Link to="/admin/dashboard" className="btn-dark btn-md py-2 px-2 rounded mb-5 text-decoration-none">ADMIN DASHBOARD</Link>
            )}
            {user.role === 0 && (
                <Link to="/user/dashboard" className="btn-dark btn-md py-2 px-2 rounded mb-5 text-decoration-none">USER DASHBOARD</Link>
            )}
            <div className="row bg-dark rounded mt-4">
                <div className="col-md-8 offset-md-2">
                    {/* {ratingMessage()} */}
                    {createOrderForm()}
                </div>
            </div>
        </Base>
    )
};

export default ViewOrderDetails;