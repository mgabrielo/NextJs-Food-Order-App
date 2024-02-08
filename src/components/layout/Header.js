"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "../AppContext";

export default function Header() {
  const { status, update, data } = useSession()
  const defaultImage = "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
  const { cartProducts } = useContext(CartContext)
  const [profileData, setProfileData] = useState({
    email: '',
    image: defaultImage,
    name: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/api/profile").then((res) => {
        if (res.status == 200 && res.data !== undefined && res.data?.image !== undefined) {
          setProfileData({ email: res.data?.email, image: res.data?.image })
          update({ name: res.data?.name, image: res.data?.image })
        }
      });
    };
    fetchData();
  }, [])

  return (
    <header className="flex sm:flex flex-col md:flex-row lg:flex-row items-center justify-between">
      <nav className="flex sm:flex flex-col md:flex-row lg:flex-row gap-6 text-gray-600 font-semibold items-center">

        <a
          className="text-primary font-semibold text-xl md:text-2xl lg:text-3xl"
          href="/"
        >
          Great Pizza
        </a>
        <div className="space-x-3 text-md md:text-lg lg:text-xl pt-0 md:pt-1 lg:pt-2">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </div>
      </nav>
      <div className="border-2 md:border-0 lg:border-0 border-gray-300 w-full md:hidden lg:hidden my-3 md:my-0 lg:my-0" />

      <nav className="flex w-fit items-center gap-2 text-gray-600 mt-3 lg:mt-0">
        {
          status == 'authenticated' && profileData && (
            <div className="w-full flex items-center justify-center gap-3 p-0">
              {
                profileData.image && (
                  <div className="relative w-12 h-12 object-cover justify-center items-center">
                    <Image
                      src={data?.user?.image !== undefined && data?.user?.image !== null ? data?.user?.image : profileData.image}
                      fill
                      priority={true}
                      sizes="20vw"
                      alt={"user-icon"}
                      className="rounded-full items-center"
                    />
                  </div>
                )
              }


              <div className="flex items-center gap-3 justify-center">
                <Link href={'/profile'} className="whitespace-nowrap text-sm md:text-md lg:text-lg text-gray-500 font-semibold">
                  {data?.user?.name?.length > 0 && data?.user?.name !== undefined ? data?.user?.name : profileData.email}
                </Link>

                {cartProducts && cartProducts?.length > 0 && (
                  <Link href={'/cart'} className="flex w-full p-0">
                    <span className="flex gap-2">Cart ({cartProducts.length})</span>
                  </Link>
                )}

                <button
                  className="bg-primary text-white rounded-full px-5 py-2 whitespace-nowrap"
                  onClick={() => signOut()}
                >
                  Log Out
                </button>
              </div>
            </div>
          )
        }
        {
          status == 'unauthenticated' && (
            <>
              <Link
                href={'/login'}
              >
                Login
              </Link>
              <Link
                className="bg-primary text-white rounded-full px-5 py-2"
                href={'/register'}
              >
                Register
              </Link>
            </>
          )
        }
      </nav>
    </header>
  )
}
