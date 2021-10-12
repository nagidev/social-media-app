import React from "react";

import Navbar from './Navbar';

const AppFrame = (props) => {
    return (
        <div className="bg-dark flex-col fit-screen">
            <Navbar brand="SheepBook" token={props.token} signout={props.signout} />   
            {props.children}
            <footer className="footer flex-center bg-dark">
                <p></p>
            </footer>
        </div>
    )
};

export default AppFrame;