const Students = require("../models/Students")
const bcrypt = require("bcryptjs")

const updatePasssword = async (req, res) => {
    const { password } = req.body;
    const id = req.user.id;
    try {
        const hash_password = bcrypt.hashSync(password, Math.floor(Math.random() * 100))
        const result = await Students.updateOne({ _id: id }, { password: hash_password });

        if (result && result.nModified === 1) {
            return res.status(200).json({ message: "Password updated successfully." });
        } else {
            return res.status(500).json({ error: "Error updating password" });
        }

    } catch (error) {
        return res.status(200).json({ message: "Error updating password." })
    }
}

module.exports = updatePasssword;