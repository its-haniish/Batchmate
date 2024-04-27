const jwt = require("jsonwebtoken");

const autoLogin = async (req, res) => {
    try {
        const token = req.body.token; // Assuming the JWT token is sent in the request body

        if (token) {
            // Verify the JWT token
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    // JWT verification failed, handle error
                    console.error('JWT verification failed:', err);
                    res.status(401).json({ message: 'Unauthorized' });
                } else {
                    // JWT verification successful, user is authenticated
                    // Here, you might want to perform additional checks like verifying the user's existence in the database
                    // If everything is fine, you can consider the user logged in
                    // Respond with success or redirect to the main page
                    res.status(200).json({ message: 'Auto login successful' });
                }
            });
        } else {
            // No token provided, user needs to log in manually
            console.log('No token provided');
            res.status(400).json({ message: 'Token not provided' });
        }
    } catch (error) {
        console.error('Auto login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = autoLogin
