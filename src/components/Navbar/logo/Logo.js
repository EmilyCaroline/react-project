import React from "react";

import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo hoverable">
      <img src="./reddit-logo.jpg" />
      <span>reddit</span>
    </div>
  );
}