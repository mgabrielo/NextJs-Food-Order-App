'use client'
import { SessionProvider } from 'next-auth/react'
import { createContext, useState } from 'react'

export const CartContext = createContext({})

const AppProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])
    function addToCart(product, size = null, extras = []) {
        setCartProducts((prev) => {
            const newProducts = [...prev, { ...product, size, extras }]
            return newProducts
        })
    }
    return (
        <SessionProvider>
            <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}

export default AppProvider