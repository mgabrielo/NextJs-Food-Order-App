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
    const { _id, ...data } = await req.json()
    const res = await MenuItem.findByIdAndUpdate(_id, data)
    if (res) {
        return Response.json(true)
    }
}