const database = require('../database');

const query = `
    DROP TABLE IF EXIST users_tab;
    CREATE TABLE users_tab {
        id SERIAL primary key,
        username VARCHAR unique not null,
        password VARCHAR not null
    }
`;
database.query(query)
    .then((response) => {
        return console.log(`Executed ${response.length} queries successfully`);
    }).catch((error) => {
        return console.error(error);
    }).finally(() => {
        database.end();
    });