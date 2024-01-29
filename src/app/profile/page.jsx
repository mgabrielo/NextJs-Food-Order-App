"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditProfile from "../../components/icons/EditProfile";

export default function ProfilePage() {
  const session = useSession();
  const { data, status, update } = useSession();
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (status == "authenticated") {
      const usernameExtract =
        data?.user?.name !== undefined
          ? data?.user?.name
          : data?.user?.email.substring(0, data?.user?.email.indexOf("@"));
      setUserName(usernameExtract);
      const profileImgExtract =
        data?.user?.image !== undefined
          ? data?.user?.image
          : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png";
      setImage(profileImgExtract);
    }
    if (saved)
      setTimeout(() => {
        setSaved(false);
      }, 2500);
  }, [session, status, saved]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    await axios
      .put("/api/profile", { name: userName, image: image })
      .then((res) => {
        setSaved(true);
        if (res.status == 200) {
          update({ name: userName, image: image });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    if (files?.length === 1 && files !== undefined) {
      console.log(files[0]);
      formData.set("files", e.target.files[0]);
      await axios.post("/api/upload", formData).then((res) => {
        if (res.status == 200 && res.data) {
          setImage(res.data);
        }
      });
    }
  };
  return (
    <section className="mt-8">
      <h1 className="text-primary text-center text-2xl font-semibold mb-4">
        Profile
      </h1>
      <form className="w-full md:max-w-xl mx-auto">
        {saved && (
          <h2 className="text-center bg-green-200 border border-green-700 p-3 rounded-lg text-green-800 my-5">
            Profile Saved
          </h2>
        )}
        <div className="flex flex-col md:flex-row lg:flex-row gap-2 items-center">
          <div className="relative justify-center items-center">
            {image && (
              <div className="relative w-[150px] h-[150px] object-cover justify-center items-center my-2">
                <Image
                  src={image}
                  fill
                  priority={true}
                  sizes="20vw"
                  alt={"user-icon"}
                  className="rounded-full items-center px-2 mb-4"
                />
              </div>
            )}
            <label>
              <div className="flex justify-center items-center">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e)}
                />
                <span className="flex gap-2 border border-primary px-4 py-2 bg-primary text-white rounded-md">
                  <EditProfile />
                  <p>Edit</p>
                </span>
              </div>
            </label>
          </div>
          <div className="space-y-5 w-full md:grow lg:grow px-5 md:px-0 lg:px-0">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isSaving}
            />
            <input type="email" value={data?.user?.email} disabled={true} />
            <button onClick={(e) => handleProfileUpdate(e)} disabled={isSaving}>
              {isSaving ? "Saving Update..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
