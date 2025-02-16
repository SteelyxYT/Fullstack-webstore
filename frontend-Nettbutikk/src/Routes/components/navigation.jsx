import { NavLink } from "react-router";
import '../assets/Navigation.css';
import UserButton from "./UserButton";

export function Navigation() {
  return (
    <div className="navigation">
      <div className="productNav">
        <NavLink className={"NavBtn"} to="/" end>Home</NavLink>
        <NavLink className={"NavBtn"} to="/" end>Products</NavLink>
        <NavLink className={"NavBtn"} to="/" end>Categories</NavLink>
      </div>

      <input type="text" placeholder="Search" />
      <div>
        <UserButton />
        <NavLink className={"NavBtn"} to="/cart" end>Cart</NavLink>
      </div>
    </div>
  )
}