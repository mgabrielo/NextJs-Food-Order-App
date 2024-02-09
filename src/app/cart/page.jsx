"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeader from "@/components/layout/SectionHeader";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import TrashIcon from "../../components/icons/TrashIcon";
import AddressInput from "../../components/layout/AddressInput";
import { useProfile } from "../../components/UseProfile";

export default function page() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const { userData } = useProfile();
  const [address, setAddress] = useState({
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (userData) {
      const { streetAddress, city, postalCode, country } = userData;
      setAddress({
        streetAddress: streetAddress == undefined ? "" : streetAddress,
        city: city == undefined ? "" : city,
        postalCode: postalCode == undefined ? "" : postalCode,
        country: country == undefined ? "" : country,
      });
    }
  }, [userData]);

  let total = 0;

  for (const product of cartProducts) {
    if (cartProducts?.length > 0) {
      total += cartProductPrice(product);
    }
  }

  return (
    <section>
      <div className="mt-8 text-center">
        <SectionHeader mainHeader={"Cart"} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          {cartProducts && cartProducts?.length > 0 ? (
            <>
              {cartProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 my-3 p-3 border-b"
                >
                  <div className="w-28">
                    <Image
                      src={product?.image}
                      width={250}
                      height={250}
                      alt={`product-${index}`}
                    />
                  </div>
                  <div className="grow">
                    <h3> {product?.name}</h3>
                    {product?.size && (
                      <div className="text-sm text-gray-600">
                        Size : <span>{product?.size?.name}</span>
                      </div>
                    )}

                    {product?.extras?.length > 0 && (
                      <div className="flex gap-1 text-sm text-gray-600">
                        Extras :
                        {product?.extras.map((extra, idx) => (
                          <div key={idx}>
                            {extra?.name} - ${extra?.price}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-semibold px-2">
                    {cartProductPrice(product)}
                  </div>
                  <div>
                    <button
                      className="p-2"
                      type="button"
                      onClick={() => removeCartProduct(index)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-right px-8 font-bold text-lg">
                Total: ${total}
              </div>
            </>
          ) : (
            <div>No Products in Shopping Cart</div>
          )}
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-center font-semibold text-lg my-2">Checkout</h2>
          <form>
            <AddressInput
              otherFormData={address}
              setOtherFormData={setAddress}
            />
            <button type="button" className="bg-primary text-white border-0">
              Pay ${total}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
