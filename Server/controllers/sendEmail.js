const sendEmailFn = require('../functions/sendEmailFn.js');
const Students = require('../models/Students.js')

const sendEmail = async (req, res) => {
    const { email, subject, msg, type, rollNo } = req.body;

    try {
        const doesEmailExist = await Students.findOne({ email });

        if (type === 'signup') {
            const doesRollNoExist = await Students.findOne({ rollNo });
            if (doesRollNoExist) {
                return res.status(409).json({ message: 'Id card already in use.' })
            }
            if (doesEmailExist) {
                return res.status(409).json({ message: 'Email is already in use.' })
            }
        }
        if (type === "forget password") {
            if (!doesEmailExist) {
                return res.status(409).json({ message: 'Email is not registered.' })
            }
        }
        await sendEmailFn({ email, subject, msg })
            .then(() => {
                res.status(200).json({
                    message: "Message sent successfully",
                })
            })
            .catch(() => {
                res.status(500).json({
                    message: "Failed to send message"
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

module.exports = sendEmail;