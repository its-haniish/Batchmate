const Teachers = require('../models/Teachers')

const searchTeachers = async (req, res) => {

    try {
        // console.log(college);
        const teachers = await Teachers.find({});
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