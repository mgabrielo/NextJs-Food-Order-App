"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import EditProfile from "../../components/icons/EditProfile";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import { toast } from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import EditableImage from "../../components/layout/EditableImage";
export default function ProfilePage() {
  const session = useSession();
  const defaultImage =
    "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png";
  const { data, status, update } = useSession();
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [otherFormData, setOtherFormData] = useState({
    name: "",
    email: "",
    image: defaultImage,
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    admin: false,
  });

  useEffect(() => {
    if (status == "authenticated") {
      setProfileFetched(false);
      const fetchData = async () => {
        await axios.get("/api/profile").then((res) => {
          if (res.status == 200 && res.data !== undefined) {
            setOtherFormData((prev) => ({
              ...prev,
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
            }));
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

  if (status === "loading" || !profileFetched) {
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
      .put("/api/profile", otherFormData)
      .then((res) => {
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

  // const handleFileChange = async (e) => {
  //   const files = e.target.files;
  //   const formData = new FormData();
  //   if (files?.length === 1 && files !== undefined) {
  //     console.log(files[0]);
  //     formData.set("files", e.target.files[0]);
  //     setIsUploading(true);
  //     await axios
  //       .post("/api/upload", formData)
  //       .then((res) => {
  //         if (res.status == 200 && res.data) {
  //           setOtherFormData({ ...otherFormData, image: res.data });
  //         }
  //       })
  //       .finally(() => {
  //         setIsUploading(false);
  //       });
  //   }
  // };

  return (
    <section className="mt-8">
      {otherFormData.admin ? (
        <UserTabs isAdmin={otherFormData.admin} />
      ) : (
        <h1 className="text-primary text-center text-2xl font-semibold mb-4">
          Profile
        </h1>
      )}
      <form className="w-full md:max-w-xl lg:max-w-2xl mx-auto">
        {saved && <SuccessBox>Profile Saved</SuccessBox>}
        {isSaving && <InfoBox>Saving Profile In Progress</InfoBox>}
        {isUploading && <InfoBox>Image Upload In Progress</InfoBox>}
        <div className="flex flex-col md:flex-row lg:flex-row gap-2 items-center">
          <div className="relative justify-center items-center md:-top-36 lg:-top-36">
            <EditableImage
              otherFormData={otherFormData}
              setOtherFormData={setOtherFormData}
            />
            {/* {otherFormData && otherFormData?.image && (
              <div className="relative w-[100px] md:w-[120px] lg:w-[150px] h-[100px] md:h-[120px] lg:h-[150px] object-cover justify-center items-center my-2">
                <Image
                  src={otherFormData?.image}
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
            </label> */}
          </div>
          <div className="w-full md:grow lg:grow px-5 md:px-0 lg:px-0  space-y-5">
            <input
              type="text"
              value={otherFormData?.name}
              onChange={(e) =>
                setOtherFormData({
                  ...otherFormData,
                  name: e?.target?.value,
                })
              }
              style={{ paddingLeft: 12 }}
              placeholder="username"
            />
            <input
              type="email"
              value={otherFormData?.email}
              style={{ paddingLeft: 12 }}
              placeholder="email"
              readOnly
            />
            <input
              type="tel"
              value={otherFormData?.phone}
              onChange={(e) =>
                setOtherFormData({
                  ...otherFormData,
                  phone: e?.target?.value,
                })
              }
              style={{ paddingLeft: 12 }}
              placeholder="phone number"
            />
            <input
              type="text"
              value={otherFormData?.streetAddress}
              onChange={(e) =>
                setOtherFormData({
                  ...otherFormData,
                  streetAddress: e?.target?.value,
                })
              }
              style={{ paddingLeft: 12 }}
              placeholder="street address"
            />
            <input
              type="text"
              value={otherFormData?.postalCode}
              onChange={(e) =>
                setOtherFormData({
                  ...otherFormData,
                  postalCode: e?.target?.value,
                })
              }
              style={{ paddingLeft: 12 }}
              placeholder="postalcode"
            />
            <input
              type="text"
              value={otherFormData?.city}
              onChange={(e) =>
                setOtherFormData({
                  ...otherFormData,
                  city: e?.target?.value,
                })
              }
              style={{ paddingLeft: 12 }}
              placeholder="city"
            />
            <input
              type="text"
              value={otherFormData?.country}
              onChange={(e) =>
                setOtherFormData({
                  ...otherFormData,
                  country: e?.target?.value,
                })
              }
              style={{ paddingLeft: 12 }}
              placeholder="country"
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
