'use client'
import { useEffect, useState } from 'react'
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from './MenuItemPriceProps';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState({ image: menuItem?.image ? menuItem?.image : '' });
    const [description, setDescription] = useState(menuItem?.description || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [basePrice, setBasePrice] = useState(Number(menuItem?.basePrice || ''));
    const [sizes, setSizes] = useState(menuItem?.sizes || [])
    const [extraIngridentPrices, setExtraIngridentPrices] = useState(menuItem?.extraIngridentPrices || [])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(menuItem?.category || '')

    useEffect(() => {
        const fetchCategories = async () => {
            await axios.get('/api/categories').then((res) => {
                if (res.status == 200 && res.data) {
                    setCategories(res.data)
                }
            }).catch(() => {
                toast.error('could not fetch categories')
            })
        }
        fetchCategories()
    }, [])
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
                    <label>Menu Category Select</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories && categories.length > 0 && categories.map((category, index) => (
                            <option value={category?._id} key={index}>{category?.name}</option>
                        ))}
                    </select>
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
                        onClick={(e) => onSubmit(e, { name, description, image, basePrice, sizes, extraIngridentPrices, category })}
                    >
                        Save Menu Item
                    </button>
                </div>
            </div>
        </form>
    )
}
