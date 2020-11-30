import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import { loadCart } from "./helper/CartHelper";

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color : "#f4a460"}
    }
    else{
        return {color : "#FFFFFF"}
    }
}

const Menu = ({ history }) => {
    return(
        <div>
            <ul className="nav nav-tabs pb-2 pt-2">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">HOME</Link>  
                </li>
                {loadCart() && (loadCart().length !== 0) && (
                    <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">CART</Link>  
                </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                    <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">USER DASHBOARD</Link>  
                </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                    <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">ADMIN DASHBOARD</Link>
                </li>
                )}  
                {!isAuthenticated() && (
                    <Fragment>
                     <li className="nav-item">
                        <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">SIGN UP</Link>  
                     </li>
                     <li className="nav-item">
                        <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">SIGN IN</Link>  
                     </li>
                    </Fragment>
                )}
                
                {isAuthenticated() && (
                    <li className="nav-item">
                    <span className="nav-link text-white" onClick={() => {
                        signout(() => {
                            history.push("/");
                        })
                    }}>SIGN OUT</span>
                </li>
                )}
                
            </ul>
        </div>
    );
}

export default withRouter(Menu);