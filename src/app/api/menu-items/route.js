import mongoose from "mongoose"
import MenuItem from "../models/MenuItem"

export async function POST(req) {
    const data = await req.json()
    const res = await MenuItem.create(data)
    return Response.json(res)
}

export async function GET() {
    const data = await MenuItem.find()
    if (data) {
        return Response.json(data)
    }
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGODB_URI)
    const { _id, ...data } = await req.json()
    const { otherData, image } = data
    const res = await MenuItem.findByIdAndUpdate(_id, {
        name: otherData?.name,
        description: otherData?.description,
        basePrice: otherData?.basePrice,
        image: image,
        sizes: otherData?.sizes,
        category: otherData?.category,
        extraIngridentPrices: otherData?.extraIngridentPrices,
    })
    if (res) {
        return Response.json(true)
    }
}

export async function DELETE(req) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    console.log(id)
    await MenuItem.findByIdAndDelete(id)
    return Response.json(true)
}