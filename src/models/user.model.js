import mongoose , {schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
      username:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true               // whenever we need to make a field searchable in mongoDB , make index as "true"
      },
      email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
      },
      fullName:{
        type: String,
        required:true,
        trim:true
      },
      avatar:{
        type:String,        // cloudinary url   [service similar to AWS , gives us an "Url" , for the images,videos - file we upload]
        required:true
      },
      coverImage:{
        type:String,      // cloudinary url
      },
      watchHistory:[
        {
        type:Schema.Types.ObjectId,
        ref:"Video"
        }
      ],
      password:{
        type:String,
        required:[true,'password is required']
      },
      refreshToken:{
        type:String
      }

    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

// injecting methods into schema
userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefToken = function() {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)