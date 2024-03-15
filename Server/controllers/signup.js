const Students = require('../models/Students.js');

const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const studentExist = await Students.findOne({ email });

        if (studentExist) {
            return res.status(403).json({ error: 'Email already in use' }); // Return added
        }

        let studentCreated = await Students.create({ name, email, password });

        const token = await studentCreated.generateToken();

        return res.status(200).json({
            msg: 'Account created successfully :)',
            token
        });

    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).json({ error: 'Internal Server Error' }); // Return added
    }
}

module.exports = signup;
