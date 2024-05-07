const Teachers = require('../models/Teachers')
const Feedbacks = require('../models/Feedbacks')

const searchTeachers = async (req, res) => {

    try {
        // console.log(college);
        const teachers = await Teachers.find({});
        if (!teachers) {
            return res.status(200).json([]);
        }
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json([])
    }

}

const searchTeachById = async (req, res) => {
    const { id } = req.body

    try {
        const teacher = await Teachers.findOne({ _id: id });
        let feedbacks = await Feedbacks.find({ teacherId: id });
        if (!feedbacks) {
            feedbacks = []
        }
        return res.status(200).json({ teacher, feedbacks });

    } catch (error) {
        console.log(error);
        return res.status(500).json([])
    }
}

const getPopularTeachers = async (req, res) => {

    try {
        const teachers = await Teachers.find({});
        if (!teachers) {
            return res.status(200).json([]);
        }
        let popularTeachers = teachers.filter(teacher => teacher.feedbacks.length !== 0);
        return res.status(200).json(popularTeachers);
    } catch (error) {
        return res.status(500).json([])
    }

}


module.exports = { searchTeachers, searchTeachById, getPopularTeachers };
