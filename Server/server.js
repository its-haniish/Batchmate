require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 8080;
const connectDB = require('./functions/connectDB.js');
const routes = require('./routes/routes.js');

app.use(express.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', routes);

// Define the /ping route
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Function to ping the server periodically
const startSelfPing = () => {
    console.log('Starting self-ping function...');
    const interval = 14 * 60 * 1000; // 14 minutes in milliseconds

    const pingServer = async () => {
        try {
            const fetch = (await import('node-fetch')).default;
            const response = await fetch(`https://batchmate-server.onrender.com/ping`);
            if (response.ok) {
                console.log('Ping successful');
            } else {
                console.error('Ping failed', response.statusText);
            }
        } catch (error) {
            console.error('Error pinging server:', error);
        }
    };

    setInterval(pingServer, interval);
};

// calling the connectDB function and listening server in then block
connectDB(process.env.DATABASE_URI).then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
        startSelfPing(); // Start the self-ping function
    });
});
