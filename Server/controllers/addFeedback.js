const Feedbacks = require('../models/Feedbacks.js');

const addFeedback = async (req, res) => {
    try {
        // Create feedback
        const feedbackCreated = await Feedbacks.create(req.body);

        if (feedbackCreated) {
            return res.status(201).json({ message: 'Feedback added successfully', feedback: feedbackCreated });
        } else {
            return res.status(500).json({ error: 'Failed to add feedback' });
        }
    } catch (error) {
        console.error('Error adding feedback:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = addFeedback;
