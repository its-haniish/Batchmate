require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 8080 || process.env.PORT
const connectDB = require('./functions/connectDB.js')
const routes = require('./routes/routes.js')

app.use(express.json());
app.use(cors());
app.use('/', routes);


// calling the connectDB function and listening server in then block
connectDB(process.env.DATABASE_URI).then(() => {
    // listening server
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
    });
});



