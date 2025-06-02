import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // accountType: {
    //     type: String,
    //     enum: ["Buyer", "Seller", "Both"],
    //     required: true,
    // },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    },
    refreshToken: {
        type: String
    }
},

    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)

}

userSchema.methods.generateAccessToken = function () {

    const token = jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    );


    return token;
}

userSchema.methods.generateRefreshToken = function () {

    const refreshToken = jwt.sign(
        // Payload
        {
            _id: this._id,

        },

        // secret
        process.env.REFRESH_TOKEN_SECRET,

        // Options: Optional settings like token expiration time.
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )

    return refreshToken

}

export const User = mongoose.model('User', userSchema)