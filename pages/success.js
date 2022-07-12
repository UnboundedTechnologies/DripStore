import React, {useEffect} from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runConfetti } from "../lib/utils";

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantity(0);
        runConfetti();
    },[]);

return (
    <div className="success-wrapper">
        <div className="success">
            <p className="icon">
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your order!</h2>
            <p className="email-msg">
                Check your email inbox for the receipt.
            </p>
            <p className="description">
                If you have any questions, please contact us at
                <a className="email" href="mailto:unboundedtechnologies@gmail.com" >
                    unboundedtechnologies@gmail.com
                </a>
            </p>
            <Link href="/">
                <button type="button" className="btn">
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  );
}

export default Success;