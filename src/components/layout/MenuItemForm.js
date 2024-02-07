'use client'
import { useEffect, useState } from 'react'
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from './MenuItemPriceProps';

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState({ image: menuItem?.image ? menuItem?.image : '' });
    const [description, setDescription] = useState(menuItem?.description || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [basePrice, setBasePrice] = useState(Number(menuItem?.basePrice || ''));
    const [sizes, setSizes] = useState(menuItem?.sizes || [])
    const [extraIngridentPrices, setExtraIngridentPrices] = useState(menuItem?.extraIngridentPrices || [])

    return (
        <form
            className="mt-8 max-w-lg mx-auto"
        >
            <div className="grid items-start gap-4 grid-cols-[0.4fr,0.8fr]">
                <div>
                    <EditableImage otherFormData={image} setOtherFormData={setImage} />
                </div>
                <div className="grow">
                    <label>Menu Item Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Menu Item Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>Menu Base Price</label>
                    <input
                        type="text"
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}
                    />
                    <MenuItemPriceProps
                        props={sizes}
                        setProps={setSizes}
                        name={'Sizes'}
                        buttonLabel={'Add Item Size'}
                    />
                    <MenuItemPriceProps
                        props={extraIngridentPrices}
                        setProps={setExtraIngridentPrices}
                        name={'Extra Ingridents'}
                        buttonLabel={'Add Ingrident Prices'}
                    />
                    <button
                        className="bg-primary text-white border-0 mb-3"
                        onClick={(e) => onSubmit(e, { name, description, image, basePrice, sizes, extraIngridentPrices })}
                    >
                        Save Menu Item
                    </button>
                </div>
            </div>
        </form>
    )
}
