//Include Express and CORS Modules
const express = require('express');

const app = express();
app.use(express.json());

const { now } = require('./manager/time')

const userManager = require('./manager/user')


/*
const cors = require('cors');

//Setup to use JSON 
app.use(express.json());
//Include the module from db.js to use the Postgres Pool 
const pool = require('./db'); //Import from db.js
const { UserExistsError } = require('./manager/ERROR.JS');

//Setup to use CORS
app.use(cors());


//Setup to parse URLEncoded payload
// REQUIRED TO READ POST>BODY, If not req.body is empty
app.use(express.urlencoded({ extended: false }));

*/
//Set Express app to show its running and listen to PORT
app.get('/', (req, res) => {
    return res.send(`Server running on port ${PORT}`)
});

app.get('/now', (req, res) => {
    return now().then((time) => {
        return res.json({ now: time });
    });
});

app.post('/users', (req, res, next) => {
    const { username, password } = req.body;
    //send to database
    userManager.create(username, password).then(() => {
        return res.sendStatus(201);
    }).catch((error) => {
        if (error instanceof UserExistsError) {
            return next(createError(409, error.message));
        } else {
            return next(error);
        }
    })
    //respond accordingly
});
/*
app.post('./sessions', req, res, next) => {
    const { username, password } = req.body;
    return userManager.get(username).then((password) => {

    }).catch(next);
}

*/
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.status || 500).json({ error: err.message || `Unknown Error!` })
})

module.exports = app;

/*
// POST GET METHODS
// http://localhost:3000/api/
// Use Postman to test
app.get('/api', async (req, res, next) => {
    console.log(req.query);
    res.json(req.query);
});

app.post('/api', async (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});


//Set the Routing Path to "/api/create_table"   
app.post('/api/table', async (req, res, next) => {
    //Use the Pool to query using the SQL statement
    pool.query(CREATE_TABLE_SQL)
        .then(() => {
            res.send(`Table created`);
        })
        .catch((error) => {
            console.log(error)
            res.send(error);
        });
});
//end create table (db)

//start drop table (db)
//Create a constant variable DROP_TABLE_SQL to store the SQL statement
const DROP_TABLE_SQL = `
    DROP TABLE IF EXISTS messages;
`;
//Set the Routing Path to "/api/table"
app.delete('/api/table', async (req, res, next) => {
    //Use the Pool to query using the SQL statement
    pool.query(DROP_TABLE_SQL)
        .then(() => {
            res.send(`Table dropped`);
        })
        .catch((error) => {
            res.send(error);
        });
});
//end drop table (db)


// POST GET METHODS CONNECTED TO DB
//Set the Routing Path to "/api/message"
app.get('/api/message', async (req, res, next) => {
    try {
        console.log(req.query);
        //Create a constant variable allMessage to store the SQL statement
        const allMessage = await pool.query("SELECT * FROM messages");
        res.json(allMessage.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/api/message', async (req, res, next) => {
    try {
        console.log(req.body);
        let message = req.body.message;
        //Create a constant variable to store the SQL statement
        const newInsert = await pool.query("INSERT INTO messages (message, user) VALUES ($1, $1) RETURNING *", [message]);
        res.json({ "rowCount": newInsert.rowCount, "rows": newInsert.rows });
    } catch (err) {
        console.error(err.message);
    }
});

//delete by message
app.delete('/api/message/message', async (req, res, next) => {
    try {
        console.log(req.body);
        let message = req.body.message;
        //Create a constant variable to store the SQL statement
        const deleteMessage = await pool.query("DELETE FROM messages WHERE message = $1 RETURNING *", [message]);
        res.json(deleteMessage.rowCount + deleteMessage.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//delete by id
app.delete('/api/message/id', async (req, res, next) => {
    try {
        console.log(req.body);
        let id = req.body.id;
        //Create a constant variable to store the SQL statement
        const deleteMessage = await pool.query("DELETE FROM messages WHERE id = $1 RETURNING *", [id]);
        res.json(deleteMessage.rowCount + deleteMessage.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//POST GET users
app.get('/api/message/user', async (req, res, next) => {
    try {
        console.log(req.query);
        //Create a constant variable allMessage to store the SQL statement
        const allUsers = await pool.query("SELECT user FROM messages WHERE user = $1 RETURNING *", [user]);
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.user);
    }
});

app.delete('/api/message/user', async (req, res, next) => {
    try {
        console.log(req.body);
        let user = req.body.user;
        //Create a constant variable to store the SQL statement
        const deleteUser = await pool.query("DELETE FROM messages WHERE user = $1 RETURNING *", [user]);
        res.json(deleteUser.rowCount + deleteUser.rows);
    } catch (err) {
        console.error(err.user);
    }
});


*/
