import React from 'react';
import './home.css';
import Navbar from "./Navbar/Navbar.js";
import Contents from "./Contents/Contents.js";


export default function home(){
    return  (
        <div>
            <Navbar/>
            <div className="row">
                <div className="cols-12">
                    <Contents/>
                </div>
            </div>
        </div>
    );
}