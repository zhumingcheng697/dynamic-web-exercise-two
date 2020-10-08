import React from "react";

function Header() {
  return (
    <header className="Header">
      <h1>Weather App</h1>
      <nav>
        <a href="./?city=Shanghai">Shanghai</a>
        <a href="./?city=New York">New York</a>
        <a href="./?city=Tokyo">Tokyo</a>
        <a href="./?city=Moscow">Moscow</a>
      </nav>
    </header>
  );
}

export default Header;
