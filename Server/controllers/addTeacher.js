const Teachers = require('../models/Teachers.js');

const addTeacher = async (req, res) => {
    const { name, branch } = req.body;

    try {
        // Check if the teacher already exists
        const teacherExist = await Teachers.findOne({ name, branch });

        if (teacherExist) {
            return res.status(409).json({ error: 'Teacher already exists' });
        }

        // Create a new teacher
        const newTeacher = await Teachers.create(req.body);

        if (newTeacher) {
            return res.status(201).json({ message: 'Teacher added successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to add teacher' });
        }
    } catch (error) {
        console.error('Error adding teacher:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = addTeacher;
