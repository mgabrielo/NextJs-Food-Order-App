import React from 'react'

export default function InfoBox({ children }) {
    return (
        <div className="text-center bg-blue-200 border border-blue-700 p-3 rounded-lg text-blue-800 my-5">
            {children}
        </div>
    )
}
