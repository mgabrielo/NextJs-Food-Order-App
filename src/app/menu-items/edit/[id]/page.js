"use client";
import axios from "axios";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from '@/components/layout/MenuItemForm'
import UserTabs from "@/components/layout/UserTabs";
import { toast } from "react-hot-toast";
import Link from "next/link";
import LeftArrow from "@/components/icons/LeftArrow";
import { redirect, useParams } from "next/navigation";

export default function page() {
  const { id } = useParams()
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [menuItems, setMenuItems] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('/api/menu-items').then((res) => {
        if (res.status == 200 && res.data) {
          const item = res.data?.find((item) => item._id === id)
          if (item) {
            setMenuItems(item)
          }
        }
      })
    }
    fetchData()
  }, [])

  const handleFormSubmit = async (e, data) => {
    e.preventDefault();
    const { image, ...otherData } = data

    await axios
      .put("/api/menu-items", {
        _id: id,
        image: image?.image,
        otherData
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Menu Item Updated");
          setRedirectToItems(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (redirectToItems) {
    return redirect("/menu-items");
  }


  return (
    <section className="mt-8">
      <div>
        {loading && <p>Loading ...</p>}
        {!data && <p>Not Admin</p>}
      </div>
      <UserTabs isAdmin={data} />
      {loading && <p>Loading User Info...</p>}
      <div className="max-w-md mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <LeftArrow />
          <span>Show All Menu Items</span>
        </Link>
      </div>
      {menuItems && <MenuItemForm menuItem={menuItems} onSubmit={handleFormSubmit} />}

    </section>
  )
}
