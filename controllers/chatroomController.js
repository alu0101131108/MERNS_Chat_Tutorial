const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");


exports.createChatroom = async (req, res) => {
    // Using req.body.name will be same as using name now. (!name) can check if any name was passed. 
    const {
        name,
    } = req.body;

    // Checks if name is alphabetic.
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabetic characters.";

    // Checks if chatroom with same name is already created.
    const chatroomExists = await Chatroom.findOne({
        name,
    });
    if (chatroomExists) throw "Chatroom with the same name already exists.";

    // Creation of new chatroom.
    const chatroom = new Chatroom({
        name,
    });
    await chatroom.save();

    // Defining a success response.
    res.json({
        message: "Chatroom [" + name + "] created successfully!",
    });
};