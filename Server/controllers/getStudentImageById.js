const Students = require('../models/Students');

const getStudentImageById = async (req, res) => {
    const { id } = req.body;
    try {
        let response = await Students.findById(id);
        if (response) {
            res.status(200).json({ image: response.image });
        } else {
            res.status(404).json({ message: "Student not found." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = getStudentImageById;