import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";

const ManageCategories = ( {match} ) => {

    const [ categories, setCategories ] = useState([]);

    const { user, token } = isAuthenticated();

    const preLoad = () => {
        return (
            getAllCategories()
            .then( data => {
                if(data.error){
                   console.log(data.error)
                } else {
                   return setCategories(data)
                }
            })
        )
    }

    useEffect( () => {
        preLoad()
    }, [])

    const deletingCategory = (categoryId) => {
        return (
            deleteCategory(categoryId, user._id, token)
            .then( data => {
                if(data.error){
                    console.log(data.error)
                } else {
                    preLoad();
                }
            })
        )
    }

    return (
        
        <Base title="CATEGORY MANAGEMENT PAGE" description="MANAGE CATEGORIES HERE">
            <div className="mb-5">
                <Link className="btn-dark btn-md py-3 px-2 rounded mb-5 text-decoration-none" to={`/admin/dashboard`}>
                    ADMIN HOME
                </Link>
            </div>
            <div className="row mb-5">
                <div className="col-12">
                <h2 className="text-white mb-5">TOTAL {categories.length} CATEGORIES: </h2>

            {categories && categories.map((category, index) => (
                <div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                        <h3 className="text-white text-left text-uppercase" value={category._id}>{category.name}</h3>
                    </div>
                    <div className="col-4">
                        <Link
                            className="btn btn-success"
                            to={`/admin/category/update/${category._id}`}
                            >
                            UPDATE CATEGORY
                        </Link>
                    </div>
                    <div className="col-4">
                        <button onClick={() => {
                            deletingCategory(category._id)
                        }} className="btn btn-danger">
                            DELETE CATEGORY
                        </button>
                    </div>
            </div>
            ))}
                
                </div>
            </div>
    </Base>
    )
}

export default ManageCategories