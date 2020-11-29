import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashboard = () => {

    const {user: {name, email, role }} = isAuthenticated();

    const adminLeftSide = () => {
        return(
        <div className="container">
            <h6 className="card-header bg-dark text-white py-3">ADMIN NAVIGATION PANEL</h6>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/create/category" className="nav-link text-dark">CREATE CATEGORIES</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/categories" className="nav-link text-dark">MANAGE CATEGORIES</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/create/product" className="nav-link text-dark">CREATE PRODUCT</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/products" className="nav-link text-dark">MANAGE PRODUCT</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/orders" className="nav-link text-dark">MANAGE ORDERS</Link>
                </li>
            </ul>
        </div>
        )
    }

    const adminRightSide = () => {
        return (
        <div className="mb-4">
            <h6 className="card-header bg-dark text-white py-3">ADMIN INFORMATION:</h6>
            <ul className="list-group">
                <li className="list-group-item text-uppercase">
                    <span className="badge mr-2">NAME:</span> { name }
                </li>
                <li className="list-group-item">
                    <span className="badge mr-2">EMAIL:</span> { email }
                </li>
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">ADMIN ACCESS</span>
                </li>
            </ul>
        </div>
        )
    }



    return (
    <Base title="ADMIN DASHBOARD PAGE" description="WELCOME TO ADMIN DASHBOARD PAGE" className="container p-4 mb-5">
        <div className="row">
            <div className="col-4">{adminLeftSide()}</div>
            <div className="col-8">{adminRightSide()}</div>
        </div>
    </Base>
    )
}

export default AdminDashboard;