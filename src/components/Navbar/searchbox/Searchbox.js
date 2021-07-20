import React from "react";

import "./Searchbox.css";

import SearchIcon from "@material-ui/icons/Search";

export default function Searchbox() {
  return (
    <div className="searchbox">
      <label htmlFor="searchbox">
        <SearchIcon />
      </label>
      <input id="searchbox" placeholder="Search" />
    </div>
  );
}