"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CategoriesPage() {
  const { loading, data } = useProfile();
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    await axios.get("/api/categories").then((res) => {
      if (res.data && res.status == 200) {
        setCategories(res.data);
      }
    });
  }
  const AdminLoader = () => {
    return <p>Admin Info Loading....</p>;
  };

  if (data?.admin == false) {
    return <p>Not Admin</p>;
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();
    if (editedCategory) {
      await axios
        .put("/api/categories", {
          _id: editedCategory?._id,
          name: categoryName,
        })
        .then((res) => {
          if (res.status == 200) {
            setCategoryName("");
            setEditedCategory(null);
            fetchData();
            toast.success("category updated successfully");
          }
        });
    } else {
      await axios
        .post("/api/categories", { name: categoryName })
        .then((res) => {
          if (res.status == 200) {
            fetchData();
            setCategoryName("");
            toast.success("category name saved");
          }
        })
        .catch(() => {
          toast.error("category name not saved");
        });
    }
  }
  const handleCategoryDelete = async (_id) => {
    await axios
      .delete(`/api/categories/`, { params: { _id } })
      .then((res) => {
        if (res.status == 200) {
          toast.success("category deleted successfully");
        }
      })
      .catch(() => {
        toast.error("category not deleted");
      })
      .finally(() => {
        fetchData();
      });
  };
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      {loading && <AdminLoader />}
      <form className="mt-8">
        <div className="flex gap-2 items-end justify-center">
          <div className="grow">
            <label className="flex gap-1">
              {editedCategory
                ? "Edit Category Name"
                : "Create New Category Name"}
              {editedCategory && <p>: {editedCategory?.name}</p>}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 pb-3">
            <button
              className="bg-primary text-white border-0"
              onClick={(e) => handleCategorySubmit(e)}
            >
              {editedCategory ? "Update" : "Create"}
            </button>
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null), setCategoryName("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div>
        <h2 className="my-4 text-sm text-gray-600">Existing Category</h2>
        {categories &&
          categories.length > 0 &&
          categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-lg px-4 py-2 flex gap-2 mb-3 border-0 items-center"
            >
              <div className="grow">{category?.name}</div>
              <div className=" flex gap-2 ">
                <button
                  onClick={() => {
                    setEditedCategory(category);
                    setCategoryName(category?.name);
                  }}
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCategoryDelete(category._id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
