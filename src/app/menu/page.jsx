"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import { toast } from "react-hot-toast";
import HomeMenuItem from "@/components/menu/HomeMenuItem";

export default function page() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    async function fetchMenuCategories() {
      await axios
        .get("/api/categories")
        .then((res) => {
          if (res.status == 200 && res.data) {
            setCategories(res.data);
          }
        })
        .catch(() => {
          toast.error("Error fetching categories");
        });

      await axios
        .get("/api/menu-items")
        .then((res) => {
          if (res.status == 200 && res.data) {
            setMenuItems(res.data);
          }
        })
        .catch(() => {
          toast.error("Error fetching menu items");
        });
    }
    fetchMenuCategories();
  }, []);

  return (
    <section className="mt-8">
      {categories &&
        categories.length > 0 &&
        categories.map((category, index) => (
          <div key={index}>
            <div className="text-center">
              <SectionHeader mainHeader={category?.name} />
            </div>
            <div className="grid grid-cols-3 gap-2 my-3">
              {menuItems
                .filter((menuItem) => menuItem.category == category._id)
                .map((item, idx) => (
                  <HomeMenuItem key={idx} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
