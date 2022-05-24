import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const {Schema, model} = mongoose

const UserSchema = Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, enum: ["User", "Admin"], default: "User"}
    },
    {
        timestamps: true
    }
)


UserSchema.pre('save', async function(next) {
    const newUser = this
    const plainPW = this.password
    if(newUser.isModified("password")) {
        const hash = await bcrypt.hash(plainPW, 11)
        newUser.password = hash
    }
    next()
})

UserSchema.methods.toJSON = function(){
    const userDocument = this
    const userObject = userDocument.toObject()
    delete userObject.password
    delete userObject.__v

    return userObject
}

UserSchema.statics.checkCredentials = async function(email, plainPW) {
    const user = await this.findOne({ email })
    
    if(user){

        const isMatch = await bcrypt.compare(plainPW, user.password)

        if(isMatch) {
            return user
        } else {
            return null
        }
    } else {
        return null
    }
}

export default model("User", UserSchema)