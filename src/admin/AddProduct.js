import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { createProduct, getAllCategories } from "./helper/adminapicall";

const AddProduct = ({ history }) => {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories : [],
        category: "",
        formData: "",
        error: "",
        createdProduct: "",
        getARedirect: "",
        loading: false
    });

    const { name, description, price, stock, error, photo, categories, category, formData, createdProduct, getARedirect, loading} = values;

    const { user, token } = isAuthenticated();


    const preLoad = () => {
        getAllCategories()
        .then(data => {
            console.log(data);
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data, formData: new FormData()})
                console.log(categories)
            }


        })
    };

    useEffect(() => {
        preLoad();
    }, []);


    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setValues({...values, [name]:value })
    };

    const onSubmit = (event) => {

        event.preventDefault();
        setValues({...values, error: "", loading: true})

        createProduct( user._id, token, formData)
        .then( data => {
            console.log(data)
            if(data.error){
                setValues({...values, error: data.error, getARedirect: false})
            } else {
                setValues({...values, 
                name: "",
                description: "",
                price: "",
                photo: "",
                stock: "",
                formData: "",
                categories: [],
                loading: false,
                getARedirect: true,
                createdProduct: data.name})
            }
        })
    };


    const successMessage = () => {
        if(createdProduct){
        return(
            <div className="text-success">
                <h4>{createdProduct} created successfully</h4>
            </div>
        )
    }
    }

    const errorMessage = () => {
        if(error){
            return (
                <div className="text-danger">
                <h4>Product creation failed</h4>
                </div>
            )
        }
    }

    const loadingMessage = () => {
        if(loading)
        return (
            <div className="text-success">
                <h1>Loading...</h1>
            </div>
        )
    }

    loadingMessage();

    const Redirecting = () => {
        if(getARedirect)
        return setTimeout(() => {
            history.push('/admin/dashboard')
        }
        , 2000);
    }

    Redirecting();

    const createProductForm = () => {
        return (
        <form>
            <div className="form-group">
                <span className="text-white">POST PHOTO</span>
                <label className="btn-block">
                <input type="file" placeholder="choose a file" onChange={handleChange("photo")} className="text-white" name="photo" accept="image" />
                </label>
            </div>
            <div className="form-group">
                <input onChange={handleChange("name")} name="name" className="form-control text-uppercase" placeholder="Name" value={name} />
            </div>
            <div className="form-group">
                <textarea onChange={handleChange("description")} name="description" className="form-control text-uppercase" placeholder="Description" value={description} />
            </div>
            <div className="form-group">
                <input onChange={handleChange("price")} type="number" className="form-control text-uppercase" placeholder="Price" value={price} />
            </div>
            <div className="form-group">
                <select onChange={handleChange("category")} className="form-control text-uppercase" placeholder="Category">
                    <option>Select</option>
                    {categories && 
                        categories.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group">
                <input onChange={handleChange("stock")} type="number" className="form-control text-uppercase" placeholder="stock" value={stock} />
            </div>
      
            <button type="submit" onClick={onSubmit} className="btn-info rounded mb-4 mt-3">
                CREATE PRODUCT
            </button>

        </form>
        )
    } 

    return(
        <Base title="PRODUCT PORTFOLIO PAGE" description="ADD PRODUCTS HERE" className="container bg-info p-4 mb-5">
            <Link to="/admin/dashboard" className="btn-dark btn-md py-2 px-2 rounded mb-5 text-decoration-none">ADMIN PAGE</Link>
            <div className="row bg-dark rounded mt-4">
                <div className="col-md-8 offset-md-2 mt-2">
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
};

export default AddProduct;