import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import { toast } from "react-hot-toast"
import MenuItemTile from './MenuItemTile'
import Image from "next/image"

export default function HomeMenuItem(menuItem) {
    const { name, description, image, basePrice, sizes, extraIngridentPrices } = menuItem
    const { addToCart } = useContext(CartContext)
    const [showPopup, setShowPopup] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedExtras, setSelectedExtras] = useState([])
    console.log(selectedSize)
    const handleAddToCart = (e, item) => {
        e.preventDefault();
        if (sizes?.length === 0 && extraIngridentPrices?.length === 0) {
            addToCart(item)
            toast.success('Added to Cart')
        } else {
            setShowPopup(true)
        }
    }
    function handleSelectedExtra(e, extras) {
        e.preventDefault()
        const checked = e.target.checked
        if (checked) {
            setSelectedExtras((prev) => [...prev, extras])
        } else {
            setSelectedExtras((prev) => {
                return prev.filter((item) => item?.name !== extras?.name)
            })
        }
    }
    const containerStyle = {
        height: 'fit-content',
        maxHeight: 'calc(100vh-40px)'
    }

    let selectedPrice = basePrice
    if (selectedPrice) {
        selectedPrice += selectedSize?.price
    }

    if (selectedExtras.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra?.price
        }
    }

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center ">
                    <div className="bg-white p-2 rounded-lg max-w-md text-center">
                        <div className=" p-2" style={containerStyle}>
                            <Image
                                width={200}
                                height={200}
                                src={image}
                                alt={name}
                                className="mx-auto"
                            />
                            <h2 className="text-lg font-bold my-2">{name}</h2>
                            <p className="text-gray-600 text-sm" >{description}</p>
                            {
                                sizes && sizes?.length > 0 && (
                                    <div className="rounded-md p-1">
                                        <h3>Pick Your Size</h3>
                                        {
                                            sizes.map((size, index) => (
                                                <label
                                                    key={index}
                                                    className="flex items-center gap-3 p-2 border border-gray-400 rounded-md my-2"
                                                >
                                                    <input
                                                        type="radio"
                                                        name='size'
                                                        onChange={() => setSelectedSize(size)}
                                                        checked={selectedSize?.name === size?.name}
                                                    />
                                                    {size?.name} ${basePrice + size?.price}
                                                </label>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            {
                                extraIngridentPrices && extraIngridentPrices?.length && (
                                    <div className="rounded-md p-1">
                                        <h3>Pick Your Extra Ingridents</h3>
                                        {
                                            extraIngridentPrices.map((extraIngrident, index) => (
                                                <label
                                                    key={index}
                                                    className="flex items-center gap-3 p-2 border border-gray-400 rounded-md my-2"
                                                >
                                                    <input
                                                        type="radio"
                                                        name='extraIngrident'
                                                        onChange={(e) => handleSelectedExtra(e, extraIngrident)}
                                                    />
                                                    {extraIngrident?.name} +${extraIngrident?.price}
                                                </label>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <button type="button" className="bg-primary text-white">
                                Add To Cart ${selectedPrice > basePrice ? selectedPrice : basePrice}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile handleAddToCart={handleAddToCart} menuItem={menuItem} />
        </>
    )
}
