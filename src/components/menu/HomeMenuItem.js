import { useContext } from "react"
import { CartContext } from "../AppContext"

export default function HomeMenuItem(menuItem) {
    const { name, description, image, basePrice, sizes, extraIngridentPrices } = menuItem
    const { addToCart } = useContext(CartContext)
    return (
        <div className='bg-gray-200 px-4 py-2 
        rounded-lg text-center mt-10
         hover:bg-white hover:shadow-2xl
          hover:shadow-black/50 transition-all'
        >
            <div className='text-center'>
                <img
                    className='max-w-auto max-h-50 block mx-auto object-cover rounded-lg'
                    // src='https://cdn.pixabay.com/photo/2021/02/07/13/07/pizza-5991177_1280.png'
                    src={image}
                    alt='pizza-option'
                />
            </div>
            <h5 className='font-semibold my-2 text-lg'>
                {name}
            </h5>
            <p className='text-gray-600 text-sm line-clamp-3'>
                {description}
            </p>
            <button
                onClick={() => addToCart(menuItem)}
                className='bg-primary text-white rounded-full px-6 py-2 my-4'
            >
                Add to Cart ${basePrice}
            </button>
        </div>
    )
}
