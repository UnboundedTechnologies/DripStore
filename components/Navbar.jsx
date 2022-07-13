import React from "react";
import Link from "next/link";
import { AiOutlineShopping} from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
    const {showCart, setShowCart, totalQuantity} = useStateContext();
    return (
        <div className="navbar-container">
            <p className="logo-image">
                <Link href="/">
                    <img src="/static/logo4646.png" alt="drip store logo"/>
                </Link>
            </p>
            <button type="button"  className="cart-icon" onClick={() => setShowCart(true)}>
                <AiOutlineShopping />
                <span className="cart-item-qty">{totalQuantity}</span>
            </button>

            {showCart && <Cart />}
        </div>
    );
}

export default Navbar;