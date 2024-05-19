const Feedbacks = require("../models/Feedbacks.js");

const getFeedbackById = async (req, res) => {
    try {
        // Assuming Feedbacks model has a method to find latest feedbacks
        const feedbacks = await Feedbacks.findOne({ _id: req.body.id });
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = getFeedbackById;