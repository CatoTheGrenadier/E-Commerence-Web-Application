import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id == productToAdd.id
    )

    if (existingCartItem){
        return cartItems.map(
            (cartItem) => cartItem.id == productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const deleteCartItem = (cartItems, itemToDelete) => {
    if (itemToDelete.quantity > 1){
        return cartItems.map(
                (cartItem) => cartItem.id == itemToDelete.id ?
                {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        )
    }else{
        return cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id)
    }
}

const removeCartItem = (cartItems, itemToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id)
}



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    total: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newTotalCost = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setTotalCost(newTotalCost)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, deleteItemFromCart, removeItemFromCart, cartItems, cartCount, totalCost}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}