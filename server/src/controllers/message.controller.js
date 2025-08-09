import cloudinary from "../lib/cloudinary.js";
import MESSAGE from "../models/message.model.js";
import USER from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await USER.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myID = req.user._id;

        const message = await MESSAGE.find({
            $or: [
                { senderId: myID, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myID }
            ]
        })

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in getMessage controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderID = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new MESSAGE({
            senderID,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        
        // Todo: realtime functionality goes here => socket.io
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}