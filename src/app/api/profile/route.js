import { authOptions } from '../auth/[...nextauth]/route'
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import User from '../models/User';

export async function GET() {
    mongoose.connect(process.env.MONGODB_URI)
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    const data = await User.findOne({ email }).select('-password')
    if (data !== undefined) {
        return Response.json(data)
    } else {
        return Response.json({})
    }
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGODB_URI)
    const data = await req.json()
    const { _id, ...otherData } = data
    if (_id) {
        await User.updateOne({ _id }, otherData)
    } else {
        const session = await getServerSession(authOptions)
        await User.updateOne({ email: session?.user?.email }, data)
    }
    return Response.json(true)
}

