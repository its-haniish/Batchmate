require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 8080;
const connectDB = require('./functions/connectDB.js');
const routes = require('./routes/routes.js');

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', routes);

// calling the connectDB function and listening server in then block
connectDB(process.env.DATABASE_URI).then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
    });
});
