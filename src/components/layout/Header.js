'use client'
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const session = useSession()
  console.log(session?.data)
  return (
    <header className="flex sm:flex flex-col md:flex-row lg:flex-row items-center justify-between">
      <nav className="flex sm:flex flex-col md:flex-row lg:flex-row gap-6 text-gray-600 font-semibold items-center">

        <a
          className="text-primary font-semibold text-3xl"
          href="/"
        >
          Great Pizza
        </a>
        <div className="space-x-3 text-xl pt-2">
          <Link href={'/'}>Home</Link>
          <Link href={''}>Menu</Link>
          <Link href={''}>About</Link>
          <Link href={''}>Contact</Link>
        </div>
      </nav>
      <div className="border-2 md:border-0 lg:border-0 border-gray-300 w-full md:hidden lg:hidden my-3 md:my-0 lg:my-0" />

      <nav className="flex w-fit items-center gap-4 text-gray-600 mt-3 lg:mt-0">
        {
          session?.status == 'authenticated' && (
            <div className="w-full flex items-center justify-center gap-3 p-0">
              <div className="relative w-12 h-12 object-cover justify-center items-center">
                <Image
                  src={session?.data?.user?.image}
                  fill
                  priority={true}
                  sizes="20vw"
                  alt={"user-icon"}
                  className="rounded-full items-center"
                />
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Link href={'/profile'} className="whitespace-nowrap text-lg text-gray-500 font-semibold capitalize">
                  {session?.data?.user?.name !== undefined ? session?.data?.user?.name : session?.data?.user?.email}
                </Link>
                <button
                  className="bg-primary text-white rounded-full px-5 py-2"
                  onClick={() => signOut()}
                >
                  Log Out
                </button>
              </div>
            </div>
          )
        }
        {
          session?.status == 'unauthenticated' && (
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
