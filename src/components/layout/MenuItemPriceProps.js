import { useState } from 'react'
import TrashIcon from '../icons/TrashIcon'
import PlusIcon from '../icons/PlusIcon'

export default function MenuItemPriceProps({ props, setProps, name, buttonLabel }) {

    const addProps = () => {
        setProps((prev) => [...prev, { name: '', price: 0 }])
    }
    const editProps = (e, index, prop) => {
        const newValue = e.target.value
        setProps(prev => {
            const newSizes = [...prev]
            newSizes[index][prop] = newValue
            return newSizes
        })
    }
    return (
        <div className='bg-gray-200 p-2 rounded-md mb-2 gap-1'>
            <label className='mb-1'>{name}</label>
            {props.length > 0 && props.map((size, index) => (
                <div className='flex gap-2 items-end' key={index}>
                    <div>
                        <label>Name</label>
                        <input
                            type='text'
                            placeholder='Size Name'
                            value={size?.name}
                            onChange={(e) => editProps(e, index, 'name')}
                        />
                    </div>
                    <div>
                        <label>Extra Price</label>
                        <input
                            type='text'
                            placeholder=''
                            value={size?.price}
                            onChange={(e) => editProps(e, index, 'price')}
                        />
                    </div>
                    <div>
                        <button
                            type='button'
                            className='bg-white mb-4 p-1'
                            onClick={() => setProps((prev) => prev.filter((value, indx) => indx !== index))}
                        >
                            <TrashIcon />
                        </button>
                    </div>
                </div>
            ))}
            <button className='bg-white my-2 items-center' onClick={() => addProps()} type='button'>
                <PlusIcon className='w-4 h-4 font-extrabold' />
                <span>
                    {buttonLabel}
                </span>
            </button>
        </div>
    )
}
