const request = require('supertest');
var app = require('../app')
const db = require('./testDBsetup')
const PostModel = require('../models/Post');


describe('Post Update test suite', () => {

    beforeAll(async () => await db.connect());
    afterEach(async () => await db.clear());

    afterAll(async () => await db.close());

    // Update a valid post

    it('PATCH /posts/validID', async () => {
        // Searches the post in the database... 
        const post = await PostModel.findOne({});
        const res = await request(app).patch(`/posts/${post._id}`)
            .send({
                title: 'updated title',
                description: 'updated content'
            });

        expect(res.statusCode).toBe(200);

    });

    // Try updating an invalid post

    it('PATCH /posts/invalidID', async () => {

        const res = await request(app).patch("/posts/348579")
            .send({
                title: 'updated title',
                description: 'updated content'
            });

        expect(res.statusCode).toBe(500);


    });



})