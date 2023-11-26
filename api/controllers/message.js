import Message from "../models/Message.js";

export const newMessage = async (req,res) => {
    const message = new Message(req.body);

    try {
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getMessage = async (req,res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json(error);
    }
}