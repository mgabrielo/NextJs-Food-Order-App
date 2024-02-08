"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import UserForm from "../../components/layout/UserForm";
import { useProfile } from "../../components/UseProfile";

export default function ProfilePage() {
  const session = useSession();
  const path = usePathname();
  const { status, update } = useSession();
  const { data } = useProfile();
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status == "authenticated") {
      setProfileFetched(false);
      const fetchData = async () => {
        await axios.get("/api/profile").then((res) => {
          if (res.status == 200 && res.data !== undefined) {
            setUser({
              name: res.data?.name == undefined ? "" : res.data?.name,
              email: res.data?.email,
              image:
                res.data?.image == undefined ? defaultImage : res.data.image,
              phone: res.data?.phone == undefined ? "" : res.data?.phone,
              streetAddress:
                res.data?.streetAddress == undefined
                  ? ""
                  : res.data?.streetAddress,
              postalCode:
                res.data?.postalCode == undefined ? "" : res.data?.postalCode,
              city: res.data?.city == undefined ? "" : res.data?.city,
              country: res.data?.country == undefined ? "" : res.data?.country,
              admin: res?.data?.admin == undefined ? false : res.data?.admin,
            });
            setProfileFetched(true);
          }
        });
      };
      fetchData();
    }
    if (saved)
      setTimeout(() => {
        setSaved(false);
      }, 2500);
  }, [session, status, saved]);

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const handleProfileUpdate = async (e, otherFormData) => {
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    await axios
      .put("/api/profile", otherFormData)
      .then(() => {
        update({ name: otherFormData.name, image: otherFormData.image });
        setSaved(true);
      })
      .catch((err) => {
        toast.error("Update Error");
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <section className="mt-8">
      {data ? (
        <UserTabs isAdmin={data} />
      ) : (
        <h1 className="text-primary text-center text-2xl font-semibold mb-4">
          Profile
        </h1>
      )}

      {(status === "loading" || !profileFetched) &&
        path.includes("profile") && <p>Loading...</p>}
      {user && (
        <UserForm
          user={user}
          onSave={handleProfileUpdate}
          saved={saved}
          isSaving={isSaving}
          isUploading={isUploading}
        />
      )}
    </section>
  );
}
