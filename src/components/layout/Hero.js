import Image from 'next/image'
import React from 'react'
import RightArrow from '../icons/RightArrow'
import Info from '../icons/Info'

export default function Hero() {
    return (
        <section className='grid grid-cols-1 md:grid-cols-[0.8fr,0.4fr]  my-2'>
            <div className='py-12'>
                <h1 className='font-bold text-4xl'>
                    Everything <br /> is better <br /> with a&nbsp;
                    <span className='text-primary'>
                        Pizza
                    </span>
                </h1>
                <p className='my-4 text-lg text-gray-600'>
                    Pizza is the Missing Piece that makes Life Complete
                </p>
                <div className='flex gap-4 text-center'>
                    <button className='flex w-auto  justify-center gap-2 bg-primary text-white text-sm uppercase items-center px-5 py-2 rounded-full'>
                        Order Now
                        <RightArrow />
                    </button>
                    <button className='flex  w-auto justify-center gap-2 py-2 text-gray-500 items-center'>
                        Learn More
                        <Info />
                    </button>
                </div>
            </div>
            <div className='relative hidden md:block lg:block'>
                <Image
                    src={'https://cdn.pixabay.com/photo/2016/03/05/21/47/american-1239091_1280.jpg'}
                    alt='pizza'
                    sizes='20vw'
                    priority={true}
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </div>
        </section>
    )
}
