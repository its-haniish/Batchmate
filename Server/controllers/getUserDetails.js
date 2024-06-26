const Students = require('../models/Students.js');

const getUserDetails = async (req, res) => {

    try {
        let response = await Students.findById(req.user.id)
        const { name, email, image, _id, rollNo, feedbacks, liked } = response
        res.status(200).json({ name, email, image, _id, rollNo, feedbacks, liked });
    } catch (error) {
        res.status(500).json({ error: "Server Internal Error" })
    }
}

module.exports = getUserDetails;