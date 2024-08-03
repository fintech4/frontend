import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/welcome">LOGO들어갈</Link>
        </li>
        <div>
          <li>
            <Link to="/">투자</Link>
          </li>
          <li>
            <Link to="/mypage">MY</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
