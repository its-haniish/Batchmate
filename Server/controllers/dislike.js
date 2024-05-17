const Students = require('../models/Students')
const Feedbacks = require('../models/Feedbacks')

const dislike = async (req, res) => {
    const userId = req.user.id;
    const feedbackId = req.body.feedbackId;
    try {
        const feedback = await Feedbacks.findOne({ _id: feedbackId });
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        if (!feedback.likes.includes(userId)) {
            return res.status(400).json({ message: "Not liked" });
        }
        const response = await Feedbacks.updateOne({ _id: feedbackId }, { $pull: { likes: userId } });
        const user = await Students.updateOne({ _id: userId }, { $pull: { liked: feedbackId } });
        if (response.modifiedCount === 0 && user.modifiedCount === 0) {
            res.status(400).json({ message: "Failed to dislike the feedback" });
        } else {
            console.log(`Feedback ${feedbackId} disliked by ${userId}`);
            res.status(200).json({ message: "Disliked" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).status.json({ message: "Internal Server Error" });
    }

}

module.exports = dislike;