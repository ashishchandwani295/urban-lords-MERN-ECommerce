import React from "react";
import Menu from "./Menu";

const Base = ({
    title = "My Title",
    description = "My description",
    className = "text-white p-4 mb-4",
    children
}) => {
    return(
        <div className="base">
            <Menu />
            <div className="container-fluid" >
                <div className="jumbotronpb-4 pb-4 pt-4 text-white text-center" >
                    <h4 className="display-4">{title}</h4>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer" >
                    <div className="container-fluid text-center text-white py-2">
                        <h5>If you got any questions, feel free to reach out!</h5>
                        <button className="btn text-white text-light btn-lg">Contact Us</button>
                    </div>
                        {/* <div className="container py-1">
                            <span className="text-white">An amazing <span className="text-center text-white text-strong">MERN</span> course!</span>
                        </div> */}
            </footer>
        </div>
    );
}

export default Base;