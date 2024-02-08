'use client'
import { useState } from 'react'
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from '../UseProfile';

export default function UserForm({ user, onSave, saved, isSaving, isUploading }) {
    const { data: isAdmin } = useProfile()
    const defaultImage =
        "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png";
    const [otherFormData, setOtherFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        image: user?.image || defaultImage,
        phone: user?.phone || "",
        streetAddress: user?.streetAddress || "",
        postalCode: user?.postalCode || "",
        city: user?.city || "",
        country: user?.country || "",
        admin: user?.admin || false,
    });

    return (
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
                    {isAdmin && (
                        <div className='flex gap-2 p-1'>
                            <input
                                id='adminCheckBox'
                                type='checkbox'
                                value={'1'}
                                checked={otherFormData?.admin}
                                onChange={(e) => setOtherFormData({ ...otherFormData, admin: e.target.checked })} />
                            <label htmlFor='adminCheckBox'>Admin</label>
                        </div>
                    )}
                    <button onClick={(e) => onSave(e, otherFormData)} disabled={isSaving}>
                        {isSaving ? "Saving Update..." : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    )
}
