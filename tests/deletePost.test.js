const request = require('supertest');
var app = require('../app')
const db = require('./testDBsetup')
const PostModel = require('../models/Post');


describe('Post Delete test suite', () => {

    beforeAll(async () => await db.connect());
    afterAll(async () => await db.close());

    // Delete a valid post

    it('DELETE /posts/validID', async () => {

        // Searches the post in the database... 
        const post = await PostModel.findOne({});

        // Sends update request with the postsID
        const res = await request(app).delete(`/posts/${post._id}`);

        expect(res.statusCode).toBe(204);

    });


    // Delete an ivalid post

    it('DELETE /posts/invalidID', async () => {

        // Searches the post in the database... 
        const post = await PostModel.findOne({});

        // Sends update request with the postsID
        const res = await request(app).delete("/posts/45780073737");

        expect(res.statusCode).toBe(500);

    });


})