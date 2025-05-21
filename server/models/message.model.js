import {model , Schema} from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    text:String,
    image:String
}, { timestamps:true})

const Message = model("message", messageSchema);

export default Message;