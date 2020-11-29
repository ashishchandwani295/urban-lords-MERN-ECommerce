import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ( {match} ) => {

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
        updateCategory(match.params.categoryId, user._id, token, {name})
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

    const preLoad = (categoryId) => {
        return (
            getCategory(categoryId)
            .then( data => {
                console.log(data)
                if(data.error){
                    console.log(data.error)
                } else {
                    setName(data.name);
                }
            })
        )
    }

    useEffect(() => {
        preLoad(match.params.categoryId);  
    }, [])

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category updated successfully</h4>
        }
    }


    const errorMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to updated category</h4>
        }
    }

    const updateCategoryForm = () => {
        return (
            <form className="form-group">
                <div className="form-group">
                    <p className="lead mt-2">UDPATE CATEGORY</p>
                    <input 
                    type="text" 
                    placeholder="For Ex: Summer" 
                    className="form-control my-3 text-uppercase"
                    onChange={handleChange} 
                    value={name}
                    autoFocus 
                    required>
                    </input>
                    <button className="btn-info" onClick={onSubmit}>UPDATE CATEGORY</button>
                </div>
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
    <Base title="CATEGORY UPDATION PAGE" description="UPDATE YOUR CATEGORIES HERE" className="container bg-info p-4 mb-5">
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2 mb-4">
                {successMessage()}
                {errorMessage()}
                {updateCategoryForm()}
                {adminHome()}
            </div>
        </div>
    </Base>
    )
}

export default UpdateCategory;