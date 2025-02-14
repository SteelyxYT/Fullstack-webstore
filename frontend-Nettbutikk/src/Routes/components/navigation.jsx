import { NavLink } from "react-router";
import '../assets/Navigation.css';

export function Navigation() {
  return (
    <div className="navigation">
      <div className="productNav">
        <NavLink className={"NavBtn"} to="/" end>Home</NavLink>
        <NavLink className={"NavBtn"} to="/" end>Products</NavLink>
      </div>
          
          <input type="text" placeholder="Search" />
          <NavLink className={"NavBtn"} to="/cart" end>Cart</NavLink>
    </div>
  )
}