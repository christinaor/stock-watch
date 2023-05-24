import React from "react";
import "../styles/header.css";

export default function Header() {
  const flex__text = {
    display: "flex",
    justifyContent: "space-between",
  };
  return (
    <div className="header_container">
      <header className="flex__text">
        <h1 className="hero__text">Stock Watch</h1>
        <button className="nav_login__btn">Log in/Log out</button>
      </header>
    </div>
  );
}
