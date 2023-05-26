import React from "react";
import "../styles/header.css";

export default function Header() {
  return (
    <div className="header_container">
      <header className="flex__text">
        <h1 className="hero__text">Stock Watch</h1>
        <p className="hero__desc">
          A financial web application where users can check the worth of stocks
          in their assets portfolio over time.
        </p>
        {/* <button className="nav_login__btn">Log in/Log out</button> */}
      </header>
    </div>
  );
}
