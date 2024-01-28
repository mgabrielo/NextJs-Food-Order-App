import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: (pass) => {
            if (!pass?.length || pass?.length < 5) {
                new Error(' password must be at least 5 characters')
            }
        }
    }
}, { timestamps: true })

UserSchema.post('validate', function (user) {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(user.password, salt)
    user.password = hashedPassword
})

const User = mongoose.models?.User || mongoose.model("User", UserSchema)

export default User;