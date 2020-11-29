import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { getProduct, getAllCategories, updateProduct } from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories : [],
        category: {},
        formData: "",
        error: "",
        createdProduct: "",
        getARedirect: "",
        loading: false
    });

    const { name, description, price, stock, error, photo, categories, category, formData, createdProduct, getARedirect, loading} = values;

    const { user, token } = isAuthenticated();

    //const { _id, categoryName } = category;


    const preLoad = (productId) => {
        getProduct(productId)
        .then(data => {
            //console.log(data)
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                //console.log(data.photo.data)
                preLoadCategories();
                setValues({...values,
                    name: data.name,
                    //photo: data.photo.data,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    stock: data.stock,
                    formData: new FormData()})
            }


        })
    };

    // const getSpecificCategory = (category) => {
    //     getCategory(category).then( data => {
    //         if(data.error){
    //             console.log(data.error)
    //         } else {
    //             console.log(data + "inside speicifc category")
    //             return data
    //         }
    //     })
    // }
    

    useEffect(() => {
        preLoad(match.params.productId);
    }, []);

    const preLoadCategories = () => {
        getAllCategories()
        .then( data => {
            if(data.error){
                console.log(error)
            } else {
                setValues({categories: data, formData: new FormData()})
            }
        })
    }
    

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setValues({...values, [name]:value })
    };

    const onSubmit = (event) => {

        event.preventDefault();
        setValues({...values, error: "", loading: true})

        updateProduct( match.params.productId, user._id, token, formData)
        .then( data => {
            if(data.error){
                setValues({...values, error: data.error})
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
                createdProduct: data.name})
            }
        })
    };

    const successMessage = () => {
        if(createdProduct){
        return (
            <div className="text-success">
                <h4>{createdProduct} updated successfully</h4>
            </div>
        )
        }
    }

    const errorMessage = () => {
        if(error){
            return (
                <div className="text-danger">
                <h4>Product updation failed</h4>
                </div>
            )
        }
    }

    const createProductForm = () => {
        return (
        <form>
            <div className="form-group mt-2 mb-4">
                <span className="text-white">POST PHOTO</span>
                <label className="btn-block text-white">
                <input type="file" placeholder="choose a file" onChange={handleChange("photo")} name="photo" accept="image" />
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
                        categories.map((cate, index) => (
                        <option key={index} value={cate._id}>
                            {cate.name}
                        </option>
                        ))
                    }                         
                </select>
            </div>
            <div className="form-group">
                <input onChange={handleChange("stock")} type="number" className="form-control text-uppercase" placeholder="stock" value={stock} />
            </div>
      
            <button type="submit" onClick={onSubmit} className="btn-info btn-md mb-4">
                UPDATE PRODUCT
            </button>

        </form>
        )
    } 

    return(
        <Base title="Product Management Page" description="Update Products here" className="container bg-info p-4 mb-5">
            <Link to="/admin/dashboard" className="btn-dark btn-md py-2 px-2 rounded mb-5 text-decoration-none">ADMIN PAGE</Link>
            <div className="row bg-dark rounded mt-4">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
};

export default UpdateProduct;