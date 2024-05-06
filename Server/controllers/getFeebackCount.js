const Feedbacks = require("../models/Feedbacks.js");

const getFeedbackCount = async (req, res) => {
    const { id } = req.body;
    try {
        let count = await Feedbacks.find({ teacherId: id }).count();
        return res.status(200).json({ count: count ? count : 0 })
    } catch (error) {
        return res.status(500).json({ error: "Server Internal Error" })
    }
}

module.exports = getFeedbackCount;