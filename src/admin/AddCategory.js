import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError ] = useState(false);
    const [success, setSuccess ] = useState(false);

    const { user, token } = isAuthenticated();


    const handleChange = event => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //calling backend api
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(true);
            } else {
                setError("");
                setSuccess(true);
                setName("");
            }
        })
    }

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category created successfully</h4>
        }
    }

    const errorMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to create category</h4>
        }
    }

    const createCategoryForm = () => {
        return (
            <form className="form-group">
                <p className="lead text-dark mt-2">CREATE CATEGORY</p>
                <input 
                type="text" 
                placeholder="For Ex: Summer" 
                className="form-control my-3"
                onChange={handleChange} 
                value={name}
                autoFocus 
                required></input>
                <button className="btn-info btn-md rounded mt-3" onClick={onSubmit}>CREATE CATEGORY</button>
            </form>
        )
    };

    const adminHome = () => {
        return (
            <div>
                <Link to="/admin/dashboard" className="btn-dark btn-md py-2 px-2 rounded mb-5 text-decoration-none">ADMIN HOME</Link>
            </div>
        )
    };

    return (
    <Base title="CREATE A NEW CATEGORY" description="CREATE NEW PRODUCT CATEGORIES HERE" className="container bg-info p-4 mb-5">
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2 mb-3">
                {successMessage()}
                {errorMessage()}
                {createCategoryForm()}
                {adminHome()}
            </div>
        </div>
    </Base>
    )
}

export default AddCategory;