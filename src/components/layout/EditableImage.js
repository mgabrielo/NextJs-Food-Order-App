import axios from 'axios';
import React from 'react'
import EditProfile from '../icons/EditProfile';
import Image from 'next/image';

export default function EditableImage({ otherFormData, setOtherFormData }) {
    const defaultImage =
        "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png";
    const handleFileChange = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        if (files?.length === 1 && files !== undefined) {
            formData.set("files", e.target.files[0]);
            await axios
                .post("/api/upload", formData)
                .then((res) => {
                    if (res.status == 200 && res.data) {
                        setOtherFormData({ ...otherFormData, image: res.data });
                    }
                })
        }
    }
    return (
        <>
            {otherFormData && otherFormData?.image ? (
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
            ) : (
                <div className="relative w-[100px] md:w-[120px] lg:w-[150px] h-[100px] md:h-[120px] lg:h-[150px] object-cover justify-center items-center my-2">
                    <Image
                        src={defaultImage}
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
        </>
    )
}
