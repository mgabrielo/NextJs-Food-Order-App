"use client";
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import RightArrow from "@/components/icons/RightArrow";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function page() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("/api/menu-items")
        .then((res) => {
          if (res.status == 200 && res.data) {
            setMenuItems(res.data);
          }
        })
        .catch(() => {
          toast.error("could not retrieve menu items");
        });
    }
    fetchData();
  }, []);

  return (
    <section className="mt-8 max-w-xl mx-auto">
      <UserTabs isAdmin={data} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          Create New Menu Item
          <RightArrow />
        </Link>
      </div>
      <div>
        <h2 className="text-sm mt-4 text-gray-700">Edit Menu Item</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems &&
            menuItems.length > 0 &&
            menuItems.map((menuItem, index) => (
              <Link
                href={`/menu-items/edit/${menuItem?._id}`}
                className="button mb-2 items-center"
                key={index}
              >
                <div className="relative text-center">
                  <Image
                    src={menuItem?.image}
                    alt={`menu-item-${index}`}
                    width={100}
                    height={100}
                  />
                  {menuItem?.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
