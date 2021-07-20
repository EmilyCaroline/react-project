import React from "react";

import "./Contents.css";
import MainBar from "./mainBar/mainBar";
import SideBar from "./sideBar/sideBar";



export default function Content() {
    return (
      <div className="content">
        <div className="bars-wrapper">
          <span className="popular-posts-title">Popular posts</span>
          <div className="bars-wrapper-inside">
            <MainBar/>
            <SideBar />
          </div>
        </div>
      </div>
    );
  }