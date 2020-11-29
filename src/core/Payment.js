import React, { useState, useEffect } from "react";
import { emptyCart } from "./helper/CartHelper";
import { getAToken, processPayment } from "./helper/PaymentHelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated } from "../auth/helper/index";
import DropIn from "braintree-web-drop-in-react";

const PaymentInfo = ({products, setReload = f => f, reload = undefined }) => {

    const [ info, setInfo] = useState({
        loading: "",
        error: "",
        success: "",
        clientToken: null,
        instance: {}
    }) 

    const { user, token } = isAuthenticated();

    const login = () => {
        return(
            <div>
                <h1 className="lead display-5 mb-5">PLEASE LOGIN TO CHECKOUT</h1>
            </div>
        )
    }
    const getToken = () => {

        if(!isAuthenticated()){
            return login();
        } else {

        getAToken(user._id, token)
        .then( info => {
            if(info.error){
                console.log(info.error)
                setInfo({...info, error: info.error})
            } else {
                const clientToken = info.clientToken;
                setInfo({clientToken})
            }
        })
        .catch(err => console.log(err))
    }
    }

        useEffect( () => {
            getToken();
        }, [])

    const showDropin = () => {

        if(!(info.clientToken)){
            return(
                <div>
                    <h1 className="lead display-4 mb-5">Loading...</h1>
                </div>
            )
        } else {
        return(
            <div>
                {products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success text-white" onClick={onPurchase}>BUY</button>
                    </div>
                ) : (
                    <div className="mb-5">
                        <h1 className="lead display-4">PLEASE ADD SOME PRODUCTS TO PROCEED FURTHER</h1>
                    </div>
                ) }
            </div>
        )
        }
    }

    const onPurchase = () => {
        setInfo({...info, loading: true})
        let nonce;

        let getNonce =  info.instance
        .requestPaymentMethod()
        .then( data => {
            console.log(data);
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce : nonce,
                amount: getAmount()
            };

            processPayment(user._id, token, paymentData)
            .then( response => {
                setInfo({...info, success: response.success, loading: false })
                console.log("payment successful")

                let orderData = {
                    products: products,
                    transaction_id : response.transaction.id,
                    amount: response.transaction.amount
                }

                createOrder(user._id, token, orderData);

                emptyCart();

                setReload(!reload);

            })
            .catch(error => {
                setInfo({...info, loading: false, success: false, error: error})
                console.log("payment declined " + error)
            })
        })
    }

    const getAmount = () => {

        let amount = 0;

        products.map((product) => {
            amount += product.price
        })

        return amount;
    }

    return(
        <div className="container mb-5">
            <h4 className="lead display-4">PAYMENT INFO</h4>
            {isAuthenticated() ? (showDropin()) : (login())}
        </div>
    )
}

export default PaymentInfo;