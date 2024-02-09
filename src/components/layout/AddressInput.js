"use client"
export default function AddressInput({ otherFormData, setOtherFormData }) {
  return (
    <>
      <label> Street Address</label>
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
      <label>Postal Code</label>

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
      <label>City</label>
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
      <label> Country</label>
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
    </>
  )
}
