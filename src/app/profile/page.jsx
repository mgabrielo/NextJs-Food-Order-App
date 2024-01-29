"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditProfile from "../../components/icons/EditProfile";
export default function ProfilePage() {
  const session = useSession();
  const { status, update } = useSession();
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState("");
  useEffect(() => {
    if (status == "authenticated") {
      const usernameExtract =
        session?.data?.user?.name !== undefined
          ? session?.data?.user?.name
          : session?.data?.user?.email.substring(
              0,
              session?.data?.user?.email.indexOf("@")
            );
      setUserName(usernameExtract);
      const profileImgExtract =
        session?.data?.user?.image !== undefined
          ? session?.data?.user?.image
          : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png";
      setImage(profileImgExtract);
    }
    if (saved)
      setTimeout(() => {
        setSaved(false);
      }, 2500);
  }, [session, status, saved]);
  if (session?.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session?.status === "unauthenticated") {
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
      <form className="max-w-xl mx-auto">
        {saved && (
          <h2 className="text-center bg-green-200 border border-green-700 p-3 rounded-lg text-green-800 my-5">
            Profile Saved
          </h2>
        )}
        <div className="flex gap-2 items-center">
          <div>
            <div className="rounded-md relative justify-center">
              {image && (
                <Image
                  src={image}
                  width={100}
                  height={100}
                  priority={true}
                  style={{ objectFit: "contain" }}
                  alt={"user-icon"}
                  className="rounded-full w-auto h-auto items-center px-2 mb-4"
                />
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
          </div>
          <div className="space-y-5 grow">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isSaving}
            />
            <input
              type="email"
              value={session?.data?.user?.email}
              disabled={true}
            />
            <button onClick={(e) => handleProfileUpdate(e)} disabled={isSaving}>
              {isSaving ? "Saving Update..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
