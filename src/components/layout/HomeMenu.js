import Image from 'next/image'
import React from 'react'
import HomeMenuItem from '../menu/HomeMenuItem'
import SectionHeader from './SectionHeader'

export default function HomeMenu() {
    return (
        <section>
            <div className='relative h-full right-0 left-0 w-full justify-start my-2'>
                <div className='h-48 w-48 absolute -top-12 left-12 hidden md:block lg:block' >
                    <Image
                        src={'https://cdn.pixabay.com/photo/2014/12/21/23/29/salad-575436_1280.png'}
                        alt={'salad-1'}
                        sizes='20vw'
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <div className='h-48 w-48 absolute -top-12 right-12 hidden md:block lg:block' >
                    <Image
                        src={'https://cdn.pixabay.com/photo/2014/12/21/23/29/salad-575436_1280.png'}
                        alt={'salad-2'}
                        fill
                        sizes='20vw'
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <SectionHeader subHeader={'Checkout'} mainHeader={'Menu'} />
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 relative mt-10'>
                <HomeMenuItem />
                <HomeMenuItem />
                <HomeMenuItem />
                <HomeMenuItem />
                <HomeMenuItem />
                <HomeMenuItem />
            </div>
        </section>
    )
}
