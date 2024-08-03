import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css"; // CSS 파일을 따로 관리합니다.

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
