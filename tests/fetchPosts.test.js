const request = require('supertest');
var app = require('../app')
const db = require('./testDBsetup')
const PostModel = require('../models/Post');


describe('Post fetch test suite', () => {

    beforeAll(async () => await db.connect());
    afterAll(async () => await db.close());


    it('GET /posts', async () => {
        const response = await request(app).get("/posts");
        expect(response.body).toHaveLength(1);
        expect(response.statusCode).toBe(200);
    });

    it('GET /posts/validID', async () => {

        // Searches the post in the database... 
        const post = await PostModel.findOne({ title: 'Before all, create posts' })

        expect(post.title).toBeTruthy()
        expect(post.description).toBeTruthy()
        // Sends request with the test posts' ID

        const res = await request(app).get(`/posts/${post._id}`);

        // Ensures response contains name and email 
        expect(res.body.title).toBeTruthy()
        expect(res.body.description).toBeTruthy()
    });

    it('GET /posts/invalidID', async () => {
        const response = await request(app).get("/posts/34567");
        expect(response.statusCode).toBe(500);
    });

})