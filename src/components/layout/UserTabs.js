'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function UserTabs({ isAdmin }) {
  const path = usePathname()
  return (
    <>
      {isAdmin && (
        <div className="flex mx-auto justify-center gap-2 tabs mb-3">
          <>
            <Link className={path === '/profile' ? "active" : ''} href={"/profile"}>
              Profile
            </Link>
            <Link className={path === '/categories' ? "active" : ''} href={'/categories'} > Categories</Link>
            <Link className={path.includes('menu-items') ? "active" : ''} href={'/menu-items'}> Menu Items</Link>
            <Link className={path === '/users' ? "active" : ''} href={'/users'}>Users</Link>
          </>
        </div>
      )}
    </>
  )
}
