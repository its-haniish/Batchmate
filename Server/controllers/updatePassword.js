const Students = require("../models/Students");
const bcrypt = require("bcryptjs");

const updatePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Students.findOne({ email });

        // Compare the plaintext new password with the hashed password stored in the database
        const passValid = bcrypt.compareSync(password, student.password);

        if (passValid) {
            return res.status(409).json({ message: "New password is same as your current password." });
        }

        const hash_password = bcrypt.hashSync(password, Math.floor(Math.random() * 10));
        const result = await Students.updateOne({ email }, { password: hash_password });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Password updated successfully." });
        } else {
            return res.status(500).json({ message: "Error updating password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error updating password." });
    }
};

module.exports = updatePassword;
