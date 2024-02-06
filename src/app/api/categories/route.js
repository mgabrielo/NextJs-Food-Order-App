import Category from "../models/Category"

export async function POST(req) {
    const data = await req.json()
    const result = await Category.create({ name: data?.name })
    if (result) {
        return Response.json(result)
    }
}