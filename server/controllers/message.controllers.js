import User from "../models/auth.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";


export const getAllUsers = async (req, res)=>{
    try {
        const myId = req.user.id;
        const filteredUsers = await User.find({
            _id:{
                $ne: myId
            }
        }).select("-password");

        return res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.log("Error in Getting All Users", error)
        return res.status(500).json({message:"Internal Server Error"})
        
    }
}

export const getMessages = async (req, res)=>{

    try {
       
        const { id:userToChat} =  req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                { senderId: myId, receiverId: userToChat },
                { senderId: userToChat, receiverId: myId }
            ]
        })

        return res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getting specific messages: " + error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const sendMessage = async (req, res)=>{
    try {
        
        const {text, image} = req.body;
        const { id:userToChat } =  req.params;
        console.log(req.params)
        const myId = req.user._id;

        let imageUrl;
        if(image)
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            text,
            image:imageUrl,
            senderId: myId,
            receiverId: userToChat
        })

        await newMessage.save();
        //TODO: the socket.io operations 
        const receiverSocketId = getReceiverSocketId(userToChat)
        if(receiverSocketId)
        {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage)


    } catch (error) {
        console.log("Error in sending messages: " + error)
        return res.status(500).json({message:"Internal Server Error"})
        
    }
}

export const updateMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: messageId } = req.params;

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { text },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        return res.status(200).json(updatedMessage);
    } catch (error) {
        console.log("Error in updating message: " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;

        const deletedMessage = await Message.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        return res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.log("Error in deleting message: " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}