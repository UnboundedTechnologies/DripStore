import React, { createContext, useContext, useState} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((previousTotalPrice) => previousTotalPrice + (product.price * quantity));
        setTotalQuantity((previousTotalQuantity) => previousTotalQuantity + quantity);

        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((item) => {
                if(item._id === product._id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    }
                }
                return item;
            });

            setCartItems(updatedCartItems);
        }
        else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to cart`);
    }

    const updateCartQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);

        if(value === "increment"){
            setCartItems(cartItems.map((item) => item._id === id ? { ...foundProduct, quantity: foundProduct.quantity + 1 } : item));
            setTotalPrice((previousTotalPrice) => previousTotalPrice + foundProduct.price);
            setTotalQuantity((previousTotalQuantity) => previousTotalQuantity + 1);
        }
        else if(value === "decrement"){
            if(foundProduct.quantity > 1) {
                setCartItems(cartItems.map((item) => item._id === id ? { ...foundProduct, quantity: foundProduct.quantity - 1 } : item));
                setTotalPrice((previousTotalPrice) => previousTotalPrice - foundProduct.price);
                setTotalQuantity((previousTotalQuantity) => previousTotalQuantity - 1);
            }
        }
    }

    const onRemove = (product) =>{
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems =  cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((previousTotalPrice) => previousTotalPrice - (foundProduct.price * foundProduct.quantity));
        setTotalQuantity((previousTotalQuantity) => previousTotalQuantity - foundProduct.quantity);
        setCartItems(newCartItems);
    }


    const incQty = () => {
        setQty((previousQty) => previousQty + 1);
    }

    const decQty = () => {
        setQty((previousQty) => {
            if(previousQty - 1 < 1) return 1;

             return previousQty - 1
        });
    }

    return (
        <Context.Provider
        value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantity,
            qty,
            incQty,
            decQty,
            onAdd,
            updateCartQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantity
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);