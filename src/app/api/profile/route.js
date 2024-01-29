import { authOptions } from '../auth/[...nextauth]/route'
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import User from '../models/User';

export async function PUT(req) {
    mongoose.connect(process.env.MONGODB_URI)
    const data = await req.json()
    console.log(data)
    const session = await getServerSession(authOptions)
    console.log('the-session', session)
    if ('name' in data && 'image' in data) {
        await User.updateOne({ email: session?.user?.email }, { name: data?.name, image: data?.image })
        return Response.json(true)
    }
}