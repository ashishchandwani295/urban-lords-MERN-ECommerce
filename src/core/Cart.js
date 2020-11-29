import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import PaymentInfo from "./Payment";


const Cart = () => {
    
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    const loadAllProducts = () => {
        return(
            <div>
                <h1 className="lead display-4 mb-5">PRODUCTS:</h1>
                {products && 
                    products.map((product, index) => (
                        <div key={index} className="mb-5">
                            <Card product={product} removeFromCart={true} addToCart={false} setReload={setReload} reload={reload} />
                        </div>
                    ))
                }
            </div>
        )
    };

    // const loadCheckOut = () => {
    //     return(
    //         <div>
    //             <h1 className="lead display-4 mb-5">Please proceed to checkout</h1>
    //         </div>
    //     )
    // }

    useEffect(() => {
        setProducts(loadCart());
    }, [reload])

    
    return(
        <Base title="PRODUCT CART" description ="CLICK BUY TO CHECKOUT">
            <div className="row">
                <div className="col-6 text-center text-small">
                    {products && products.length> 0 ? (loadAllProducts()) : (<h3 className="lead display-4 mb-5">NO PRODUCTS IN THE CART</h3>)}
                </div>
                <div className="col-6 text-center">
                    <PaymentInfo products={products} setReload={setReload} reload={reload}/>
                </div>
            </div>
        </Base>
        );
}

export default Cart;