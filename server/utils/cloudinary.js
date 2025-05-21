import {v2 as cloudinary} from "cloudinary"
import { config } from "dotenv"


config();

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUDNAME,
        api_key: process.env.CLOUDINARY_PUBLICKEY,
        api_secret:  process.env.CLOUDINARY_SECRETKEY
    }
)

export default cloudinary;