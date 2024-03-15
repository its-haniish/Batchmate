const Feedbacks = require('../models/Feedbacks.js');

const deleteFeedback = async (req, res) => {
    const { feedbackId } = req.body; // Assuming feedbackId is passed in URL parameters

    try {
        // Delete feedback
        const feedbackDeleted = await Feedbacks.deleteOne({ _id: feedbackId });

        if (feedbackDeleted.deletedCount > 0) {
            return res.status(200).json({ message: 'Feedback deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Feedback not found' });
        }
    } catch (error) {
        console.error('Error deleting feedback:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = deleteFeedback;
