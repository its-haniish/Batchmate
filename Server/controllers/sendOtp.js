const sendEmail = require('../functions/sendEmail.js');

const sendOtp = async (req, res) => {
    const { email, subject, msg } = req.body;

    try {
        await sendEmail({ email, subject, msg })
            .then(() => {
                res.status(200).json({
                    message: "Message sent successfully",
                })
            })
            .catch(() => {
                res.status(500).json({
                    error: "Failed to send message"
                })
            })
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }

}

module.exports = sendOtp;