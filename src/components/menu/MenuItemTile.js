
export default function MenuItemTile({ handleAddToCart, menuItem }) {
    const { image, name, description, basePrice } = menuItem

    return (
        <div className='bg-gray-200 px-4 py-2 
    rounded-lg text-center mt-10
     hover:bg-white hover:shadow-2xl
      hover:shadow-black/50 transition-all'
        >
            <div className='text-center'>
                <img
                    className='max-w-auto max-h-50 block mx-auto object-cover rounded-lg'
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
                type="button "
                onClick={(e) => handleAddToCart(e, menuItem)}
                className='bg-primary text-white rounded-full px-6 py-2 my-4'
            >
                Add to Cart ${basePrice}
            </button>
        </div>
    )
}
