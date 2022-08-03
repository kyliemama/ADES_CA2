require('dotenv').config();

const { DatabaseError } = require('pg');
const app = require('./app');
const { now } = require('./manager/time');

//Initialize PORT number
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
});
