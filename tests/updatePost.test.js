const request = require('supertest');
var app = require('../app')
const db = require('./testDBsetup')
const PostModel = require('../models/Post');


describe('Post Update test suite', () => {

    beforeAll(async () => await db.connect());
    afterAll(async () => await db.close());

    // Update a valid post

    it('PATCH /posts/validID', async () => {

        // Searches the post in the database... 
        const post = await PostModel.findOne({ title: 'Before all, create posts' })

        // console.log(post.title);
        // console.log(post.description);

        expect(post.title).toBeTruthy()
        expect(post.description).toBeTruthy()

        // Sends update request with the postsID

        const res = await request(app).patch(`/posts/${post._id}`)
            .send({
                title: 'updated title',
                description: 'updated content'
            })

        expect(res.statusCode).toBe(200);

        // Confirm that post has been updated
        const updatedPost = await PostModel.findOne({ title: 'updated title' })

        expect(updatedPost.title).toBe('updated title')
        expect(updatedPost.description).toBe('updated content')

    });

    // Try updating an invalid post

    it('PATCH /posts/invalidID', async () => {

        const res = await request(app).patch("/posts/348579")
            .send({
                title: 'updated title',
                description: 'updated content'
            })

        expect(res.statusCode).toBe(500);


    });



})