"use client";
import { useEffect, useState } from "react";
import UserTabs from "../../../components/layout/UserTabs";
import { useProfile } from "../../../components/UseProfile";
import { redirect, useParams, usePathname } from "next/navigation";
import axios from "axios";
import UserForm from "../../../components/layout/UserForm";
import { toast } from "react-hot-toast";

export default function pages() {
  const { loading, data } = useProfile();
  const path = usePathname();
  const { id } = useParams();
  const defaultImage =
    "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png";
  const [user, setUser] = useState(null);
  const [isRedirected, setIsRedirected] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      await axios.get(`/api/users/`).then((res) => {
        if (res.status == 200 && res.data) {
          const userData = res.data?.find((user) => user._id == id);
          setUser({
            name: userData?.name == undefined ? "" : userData?.name,
            email: userData?.email,
            image: userData?.image == undefined ? defaultImage : userData.image,
            phone: userData?.phone == undefined ? "" : userData?.phone,
            streetAddress:
              userData?.streetAddress == undefined
                ? ""
                : userData?.streetAddress,
            postalCode:
              userData?.postalCode == undefined ? "" : userData?.postalCode,
            city: userData?.city == undefined ? "" : userData?.city,
            country: userData?.country == undefined ? "" : userData?.country,
            admin: userData?.admin == undefined ? false : userData?.admin,
          });
        }
      });
    }
    fetchUser();
  }, []);

  if (isRedirected) {
    return redirect("/users");
  }

  async function handleSaveButton(e, data) {
    e.preventDefault();
    const userData = {
      _id: id,
      ...data,
    };
    await axios
      .put("/api/profile", userData)
      .then((res) => {
        if (res.status == 200) {
          setIsRedirected(true);
        }
      })
      .catch(() => {
        setIsRedirected(false);
        toast.error("could not complete update");
      });
  }

  return (
    <section className="max-w-xl mx-auto mt-8">
      {loading && path.includes("users") && <p>Loading</p>}
      {data ? <UserTabs isAdmin={data} /> : <p>Not Admin</p>}
      <div className="mt-8">
        {user && <UserForm user={user} onSave={handleSaveButton} />}
      </div>
    </section>
  );
}
