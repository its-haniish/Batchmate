const Feedbacks = require('../models/Feedbacks.js');
const Students = require("../models/Students.js");
const Teachers = require("../models/Teachers.js")

const addFeedback = async (req, res) => {
    const { teacherId, teacherName, time, message, stars } = req.body;
    const { id: studentId } = req.user;
    try {
        const student = await Students.findById(req.user.id);
        const teacher = await Teachers.findById(teacherId)
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

        const teacherFeedbacks = teacher.feedbacks;
        const studentFeedbacks = student.feedbacks;
        const updatedTeacher = await Teachers.updateOne({ _id: teacherId }, { feedbacks: [...teacherFeedbacks, feedbackCreated._id] })
        const updatedStudent = await Students.updateOne({ _id: studentId }, { feedbacks: [...studentFeedbacks, feedbackCreated._id] })

        if (updatedStudent.modifiedCount === 1 && updatedTeacher.modifiedCount === 1) {
            console.log('Feedback added successfully');
            return res.status(201).json({ message: 'Feedback added successfully', feedback: feedbackCreated });
        }
        return res.status(500).json({ message: 'Error adding feedback.' });
    } catch (error) {
        console.error('Error adding feedback');
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = addFeedback;
