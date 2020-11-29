import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashboard = () => {

    const {user: {name, email, role }} = isAuthenticated();

    const userLeftSide = () => {
        return(
        <div className="container">
            <h6 className="card-header bg-dark text-white py-3">USER NAVIGATION PANEL</h6>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/user/orders" className="nav-link text-dark">VIEW YOUR ORDERS</Link>
                </li>
            </ul>
        </div>
        )
    }

    const userRightSide = () => {
        return (
        <div className="mb-3">
            <h6 className="card-header bg-dark text-white py-3">USER INFORMATION</h6>
            <ul className="list-group">
                <li className="list-group-item text-uppercase">
                    <span className="badge mr-2">NAME:</span> { name }
                </li>
                <li className="list-group-item">
                    <span className="badge mr-2">EMAIL:</span> { email }
                </li>
            </ul>
        </div>
        )
    }



    return (    
    <Base title="USER DASHBOARD PAGE" description="WELCOME TO USER DASHBOARD PAGE" className="container p-4 mb-5">
        <div className="row">
            <div className="col-4">{userLeftSide()}</div>
            <div className="col-8">{userRightSide()}</div>
        </div>
    </Base>
    )
}

export default UserDashboard;