"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CategoriesPage() {
  const { loading, data } = useProfile();
  const [newCategoryName, setNewCategoryName] = useState("");
  const AdminLoader = () => {
    return <p>Admin Info Loading....</p>;
  };

  if (data?.admin == false) {
    return <p>Not Admin</p>;
  }
  async function handleNewCategorySubmit(e) {
    e.preventDefault();
    await axios
      .post("/api/categories", { name: newCategoryName })
      .then((res) => {
        if (res.status == 200) {
          toast.success("category name saved");
        }
      })
      .catch((err) => {
        toast.error("category name not saved");
      });
  }
  return (
    <section className="mt-8 max-w-lg mx-auto">
      {loading && <AdminLoader />}
      <UserTabs isAdmin={true} />
      <form className="mt-8">
        <div className="flex gap-2 items-end justify-center">
          <div className="grow">
            <label>New Category Name</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-3">
            <button
              className="bg-primary text-white border-0"
              onClick={(e) => handleNewCategorySubmit(e)}
            >
              Create Category
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
