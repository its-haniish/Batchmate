const Students = require('../models/Students');

const updateUserInfo = async (req, res) => {
    const id = req.user.id;
    const { name } = req.body;

    try {

        const result = await Students.updateOne({ _id: id }, { name });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Profile updated successfully." });
        } else {
            return res.status(501).json({ message: "Error updating profile" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Internal Error" });
    }
}

module.exports = updateUserInfo;