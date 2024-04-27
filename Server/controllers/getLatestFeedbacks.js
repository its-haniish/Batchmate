const Feedbacks = require("../models/Feedbacks.js");

const getLatestFeedbacks = async (req, res) => {
    try {
        // Assuming Feedbacks model has a method to find latest feedbacks
        const feedbacks = await Feedbacks.find().sort({ time: -1 }).limit(10);
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = getLatestFeedbacks;