const Teachers = require('../models/Teachers')

const searchTeachers = async (req, res) => {
    const { college, branch } = req.query;
    try {
        console.log(college);
        const teachers = await Teachers.find({ college, branch });
        console.log(teachers);
        if (!teachers) {
            return res.status(200).json([]);
        }
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json([])
    }

}

module.exports = searchTeachers;