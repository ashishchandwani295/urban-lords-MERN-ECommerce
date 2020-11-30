import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";


const Home = () => {
    
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)


    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        getAllProducts()
        .then(data => {
            if(data.error){
                console.log(error)
                setError(true);
            }
            setProducts(data);
            setError(false);
        })
    }

    return(
        <Base title="HOME PAGE" description ="WELCOME TO URBAN LORDS STORE">
            <div className="row">
                {products && 
                products.map((product, index) => {
                    return (
                        <div key={index} className="col-4 mb-5">
                            <Card product={product} />
                        </div>
                    )
                })}
            </div>
        </Base>
        );
}

export default Home;