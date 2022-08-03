//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require('express');
const cors = require('cors');
const pool = require('./db'); //Import from db.js

//////////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;

//////////////////////////////////////////////////////
// DISPLAY SERVER RUNNING
//////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
});
//////////////////////////////////////////////////////
// SETUP APP
//////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());

// REQUIRED TO READ POST>BODY
// If not req.body is empty
app.use(express.urlencoded({ extended: false }));
//////////////////////////////////////////////////////
// POST GET METHODS
// http://localhost:3000/api/
// Use Postman to test
//////////////////////////////////////////////////////
app.get('/api', async (req, res, next) => {
    console.log(req.query);

    res.json(req.query);
});

app.post('/api', async (req, res, next) => {
    console.log(req.body);

    res.json(req.body);
});
//////////////////////////////////////////////////////
// SETUP DB
//////////////////////////////////////////////////////
const CREATE_TABLE_SQL = `
    CREATE TABLE messages (
        id SERIAL primary key,
        message VARCHAR not null,
        username VARCHAR not null
    );
`;

app.post('/api/table', async (req, res, next) => {

    pool.query(CREATE_TABLE_SQL)
        .then(() => {
            res.send(`Table created`);
        })
        .catch((error) => {
            res.send(error);
        });
});
//////////////////////////////////////////////////////
// CLEAR DB
//////////////////////////////////////////////////////
const DROP_TABLE_SQL = `
    DROP TABLE IF EXISTS messages;
`;

app.delete('/api/table', async (req, res, next) => {

    pool.query(DROP_TABLE_SQL)
        .then(() => {
            res.send(`Table dropped`);
        })
        .catch((error) => {
            res.send(error);
        });
});
//////////////////////////////////////////////////////
// POST GET METHODS CONNECTED TO DB
//////////////////////////////////////////////////////
app.get('/api/message', async (req, res, next) => {

    try {
        console.log(req.query);

        const allMessage = await pool.query("SELECT * FROM messages");

        res.json(allMessage.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.post('/api/message', async (req, res, next) => {
    try {
        console.log(req.body);
        let message = req.body.message;
        let username = req.body.username;

        const newInsert = await pool.query("INSERT INTO messages (message, username) VALUES ($1,$2) RETURNING *", [message, username]);

        res.json(newInsert);
    }
    catch (err) {
        console.error(err.message);
    }
});
//////////////////////////////////////////////////////
// UPDATED METHODS
//////////////////////////////////////////////////////
app.get('/api/:username/message', async (req, res, next) => {
    const { username } = req.params;
    try {
        console.log(req.query);

        const selectedMessage = await pool.query('select message from messages where username = $1', [username]);

        res.json(selectedMessage.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.delete('/api/:username/message/:id', async (req, res, next) => {
    const { username } = req.params;
    const { id } = req.params;
    try {
        console.log(req.query);

        const deletedMessage = await pool.query(`DELETE FROM messages WHERE id = $1 and username = $2`, [id, username]);

        // res.json(deletedMessage.rows,);
        res.status(200).send({ "deleted row of id": id });
    }
    catch (err) {
        console.error(err.message);
    }
});

app.post('/api/:username/message', async (req, res, next) => {
    const { username } = req.params;
    try {
        console.log(req.body);
        let message = req.body.message;

        const newInsert = await pool.query("INSERT INTO messages (message, username) VALUES ($1,$2) RETURNING *", [message, username]);

        res.json(newInsert);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.put('/api/:username/message/:id', async (req, res, next) => {
    const { username } = req.params;
    const { id } = req.params;
    try {
        console.log(req.body);
        let message = req.body.message;

        const newUpdate = await pool.query(`UPDATE messages SET message = $1 Where username = $2 and id = $3`, [message, username, id]);

        res.json(newUpdate);
    }
    catch (err) {
        console.error(err.message);
    }
});
