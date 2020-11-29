import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, loadCart, removeItemFromCart } from "./helper/CartHelper";
import Image from "./helper/Image";

const Card = ({product, addToCart = true, removeFromCart = false, setReload = f => f, reload = undefined}) => {


    const [redirect, setRedirect] = useState(false);
    //visit here
    const [count, setCount] = useState(product.count)

    const getARedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const redirectToHome = (redirect) => {
        if(redirect && (loadCart().length ===0) ){
            return <Redirect to="/" />
        }
    }

    const addProductToCart = () => {
        setCount(count + 1);
        console.log(product);
        addItemToCart(product, () => { 
            setRedirect(true);
        });
    }

    const removeProductFromCart = () => {
        removeItemFromCart(product._id);
        setRedirect(true);
        setReload(!reload);
    }
    const showAddToCart = (addToCart) => {
        return(
            addToCart && <a className="btn-flat text-success text-center my-1 text-decoration-none" onClick={addProductToCart}>ADD TO CART</a>
        )
    };


    const showRemoveFromCart = (removeFromCart) => {
        return(
            removeFromCart && <a className="btn-flat text-danger text-center p-1 my-3 text-decoration-none" onClick={removeProductFromCart}>DELETE FROM CART</a>
        )
    };

    return (
            <div className="card promoting-card">
                <div className="card-header lead text-dark text-large bg-white text-center text-uppercase">
                    {product.name}
                </div>
                <div className="view overlay">
                        <Image product={product} className="card-img-top border-0 rounded-0" />
                </div>
                <div className="card-body">
                    {getARedirect(redirect)}
                    {redirectToHome(redirect)}
                    <p className="lead card-text text-dark text-large font-weight-normal mt-3 text-center text-uppercase ">{product.description}</p>
                    <p className="lead text-dark text-large bg-white text-center text-uppercase"> ${product.price}  {<s>${product.price*2.5}</s>}</p>
                </div>
                <div>
                        <div className="btn-flat text-success text-center my-1 text-decoration-none">{showAddToCart(addToCart)}</div>
                        <div className="btn-flat text-danger text-center p-1 my-3 text-decoration-none">{showRemoveFromCart(removeFromCart)}</div>
                </div>
            </div>
    )
}

export default Card;