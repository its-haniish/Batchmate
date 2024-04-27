const Feedbacks = require('../models/Feedbacks.js');
const Students = require("../models/Students.js")

const addFeedback = async (req, res) => {
    const { teacherId, teacherName, time, message, stars } = req.body;
    const { id: studentId } = req.user;
    try {
        const student = await Students.findById(req.user.id);
        // Create feedback
        const feedbackCreated = await Feedbacks.create({
            teacherId,
            teacherName,
            time,
            message,
            stars,
            studentId,
            studentName: student.name
        });

        if (feedbackCreated._id) {
            console.log('Feedback added successfully');
            return res.status(201).json({ message: 'Feedback added successfully', feedback: feedbackCreated });
        } else {
            return res.status(500).json({ error: 'Failed to add feedback' });
        }

    } catch (error) {
        console.error('Error adding feedback');
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = addFeedback;
