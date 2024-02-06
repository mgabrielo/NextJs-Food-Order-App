import Category from "../models/Category"

export async function POST(req) {
    const data = await req.json()
    const result = await Category.create({ name: data?.name })
    if (result) {
        return Response.json(result)
    }
}

export async function GET() {
    const result = await Category.find()
    if (result) {
        return Response.json(result)
    } else {
        return new Response.json({})
    }
}

export async function PUT(req) {
    const { _id, name } = await req.json()
    const res = await Category.updateOne({ _id }, { name })
    if (res) {
        return Response.json(true)
    }
}