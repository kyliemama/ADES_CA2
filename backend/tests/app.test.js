const request = require('supertest');
const database = require('../database');
const app = require('../app')

beforeEach(() => {
    return database.query("BEGIN");
});

afterEach(() => {
    return database.query('ROLLBACK');
});

afterAll(() => {
    return database.end();
});


test('It should get current time', () => {
    return request(app).get('/now').expect(200).then((response) => {
        return expect(response.body.now).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    });
});

test('It should create new user Tom123 with password password 123', () => {
    return request(app).post('/users').send({ username: 'Tom123', password: 'password123' }).expect(201);
})
test('It should create not allow duplicate new user Tom123 with same password', () => {
    const appRequest = request(app);
    const payload = { username: 'Tom123', password: 'password123' }
    return appRequest.post('/users')
        .send(payload)
        .expect(201)
        .then(() => appRequest.post('/users')
            .send(payayload)
            .expect(409));
})
test('It should create not allow duplicate new user Tom123 with different password', () => {
    const appRequest = request(app);
    const payload = { username: 'Tom123', password: 'password123' }
    const differentPayload = { username: 'Tom123', password: 'password' }
    return appRequest.post('/users')
        .send(payload)
        .expect(201)
        .then(() => appRequest.post('/users')
            .send(differentPayload)
            .expect(409));
})

test('It should give me jwt', () => {
    const appRequest = request(app);
    const payload = { username: 'Tom123', password: 'password123' };
    return appRequest.post('/users').send(payload).expect(201).then(() => {
        appRequest.post('/sessions').send(payload).expect(201)
    }).then((response) => {
        expect(response.body.token).toEqual(expect.anything())
    });
});

test('It should not give me jwt when wrong password', () => {
    const appRequest = request(app);
    const payload = { username: 'Tom123', password: 'password123' };
    const differentPayload = { username: 'Tom123', password: 'password' };
    return appRequest.post('/users').send(payload).expect(201).then(() => {
        appRequest.post('/sessions').send(differentPayload).expect(401)
    }).then((response) => {
        expect(response.body.error).toMatch(/Wrong password/)
    });
});

test('It should not give me jwt when user doesnt exist', () => {
    const appRequest = request(app);
    const payload = { username: 'Tom123', password: 'password123' };
    const differentPayload = { username: 'Tom123', password: 'password' };
    return appRequest.post('/users').send(payload).expect(201).then(() => {
        appRequest.post('/sessions').send(differentPayload).expect(404)
    }).then((response) => {
        expect(response.body.error).toMatch(/not found!/)
    });
});