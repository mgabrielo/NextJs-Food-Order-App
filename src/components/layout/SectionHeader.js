import React from 'react'

export default function SectionHeader({ mainHeader, subHeader }) {
    return (
        <div className='text-center'>
            <h1 className='uppercase text-gray-500 font-semibold leading-5'>
                {subHeader}
            </h1>
            <h1 className='text-primary font-bold text-3xl italic'>
                {mainHeader}
            </h1>
        </div>
    )
}
