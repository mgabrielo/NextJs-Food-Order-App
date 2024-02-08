'use client'
import { SessionProvider } from 'next-auth/react'
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

const AppProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])
    const cartLocalStorage = typeof window !== 'undefined' ? window.localStorage : null

    useEffect(() => {
        if (cartLocalStorage && cartLocalStorage.getItem('cart')) {
            setCartProducts(JSON.parse(cartLocalStorage.getItem('cart')))
        }
    }, [cartProducts.length])

    function saveCartToStorage(cartProducts) {
        if (cartLocalStorage) {
            cartLocalStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    function clearCart() {
        setCartProducts([])
        saveCartToStorage([])
    }

    function removeCartProduct(indexRemoved) {
        setCartProducts((prevCartProducts) => {
            const newCartProducts = prevCartProducts.filter((item, index) => index !== indexRemoved)
            saveCartToStorage(newCartProducts)
            return newCartProducts
        })
    }

    function addToCart(product, size = null, extras = []) {
        setCartProducts((prev) => {
            const newProducts = [...prev, { ...product, size, extras }]
            saveCartToStorage(newProducts)
            return newProducts
        })
    }
    return (
        <SessionProvider>
            <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, clearCart, removeCartProduct }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}

export default AppProvider