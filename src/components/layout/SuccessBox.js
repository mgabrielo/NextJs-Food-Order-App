import React from 'react'

export default function SuccessBox({ children }) {
    return (
        <div className="text-center bg-green-200 border border-green-700 p-3 rounded-lg text-green-800 my-5">
            {children}
        </div>
    )
}
