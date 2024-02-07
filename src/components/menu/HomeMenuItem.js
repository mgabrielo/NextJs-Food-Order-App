import React from 'react'

export default function HomeMenuItem() {
    return (
        <div className='bg-gray-200 px-4 py-2 
        rounded-lg text-center mt-10
         hover:bg-white hover:shadow-2xl
          hover:shadow-black/50 transition-all'
        >
            <div className='text-center'>
                <img
                    className='max-h-auto max-h-50 block mx-auto'
                    src='https://cdn.pixabay.com/photo/2021/02/07/13/07/pizza-5991177_1280.png'
                    alt='pizza-option'
                />
            </div>
            <h5 className='font-semibold my-2 text-lg'>
                Pepperoni Pizza
            </h5>
            <p className='text-gray-600 text-sm'>
                Thanks for the reply concerning my pizza of reference
            </p>
            <button
                className='bg-primary text-white rounded-full px-6 py-2 my-4'
            >
                Add to Cart $12
            </button>
        </div>
    )
}
