const Students = require('../models/Students')
const Feedbacks = require('../models/Feedbacks')

const like = async (req, res) => {
    const userId = req.user.id;
    const feedbackId = req.body.feedbackId;
    try {
        const feedback = await Feedbacks.findOne({ _id: feedbackId });
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        if (feedback.likes.includes(userId)) {
            return res.status(400).json({ message: "Already liked" });
        }
        const response = await Feedbacks.updateOne({ _id: feedbackId }, { $push: { likes: userId } });
        const user = await Students.updateOne({ _id: userId }, { $push: { liked: feedbackId } });
        if (response.modifiedCount === 0 && user.modifiedCount === 0) {
            res.status(400).json({ message: "Failed to like the feedback" });
        } else {
            console.log(`Feedback ${feedbackId} liked by ${userId}`);
            res.status(200).json({ message: "Liked" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).status.json({ message: "Internal Server Error" });
    }

}

module.exports = like;