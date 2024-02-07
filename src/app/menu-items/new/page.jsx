"use client";
import axios from "axios";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { toast } from "react-hot-toast";
import Link from "next/link";
import LeftArrow from "@/components/icons/LeftArrow";
import { redirect } from "next/navigation";
import MenuItemPriceProps from "../../../components/layout/MenuItemPriceProps";

export default function page() {
  const { loading, data } = useProfile();
  const [image, setImage] = useState({ image: "" });
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState(Number(""));
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [extraIngridentPrices, setExtraIngridentPrices] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/menu-items", {
        name,
        image: image.image,
        description,
        basePrice,
        sizes,
        extraIngridentPrices,
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Menu Item Created");
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
      <form className="mt-8 max-w-lg mx-auto">
        <div className="grid items-start gap-4 grid-cols-[0.4fr,0.8fr]">
          <div>
            <EditableImage otherFormData={image} setOtherFormData={setImage} />
          </div>
          <div className="grow">
            <label>Menu Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Menu Item Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Menu Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <MenuItemPriceProps
              props={sizes}
              setProps={setSizes}
              name={"Sizes"}
              buttonLabel={"Add Item Size"}
            />
            <MenuItemPriceProps
              props={extraIngridentPrices}
              setProps={setExtraIngridentPrices}
              name={"Extra Ingridents"}
              buttonLabel={"Add Ingrident Prices"}
            />
            <button
              className="bg-primary text-white border-0 mb-3"
              onClick={(e) => handleFormSubmit(e)}
            >
              Save Menu
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
