const request = require('supertest');
var app = require('../app')
const db = require('./testDBsetup')
const PostModel = require('../models/Post');


describe('Post fetch test suite', () => {

    beforeEach(async () => await db.connect());
    afterAll(async () => await db.close());


    test('GET /posts', async () => {
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
    });


    test('GET /posts/validID', async () => {
        // Searches the post in the database... 
        const post = await PostModel.findOne({});
        const response = await request(app).get(`/posts/${post._id}`);
        expect(response.statusCode).toBe(200);

    });


    test('GET /posts/invalidID', async () => {
        const response = await request(app).get("/posts/34567");
        expect(response.statusCode).toBe(500);
    });

})