import mongoose from 'mongoose';
import User from '../models/User'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    const data = await User.find({ email: { $nin: email } }).select('-password')
    return Response.json(data)
}