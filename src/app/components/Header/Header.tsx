import { NavLink } from "react-router";
import "./Header.scss";

export function Header() {
  return (
    <header className="header">
      <nav className="container container--no-margins">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/about">Sobre mi</NavLink>
      </nav>
    </header>
  );
}
