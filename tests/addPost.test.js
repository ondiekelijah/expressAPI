var mongoose = require('mongoose')
const PostModel = require('../models/Post');
const postData = { title: 'Test posts', description: 'New post content' };
const db = require('./testDBsetup')

describe('Post insertion test suite', () => {

    beforeAll(async () => await db.connect());
    // afterEach(async () => await db.clear());
    afterAll(async () => await db.close());


    it('Add a Post', async () => {
        const validPost = new PostModel(postData);
        const savedPost = await validPost.save();
        expect(savedPost._id).toBeDefined();
        expect(savedPost.title).toBe(postData.title);
        expect(savedPost.description).toBe(postData.description);

    });


    it('Add post with an Invalid Field', async () => {
        const postWithInvalidField = new PostModel({ title: 'Testing Invalid fields', description: 'Here is a post description', votes: 70 });
        const savedPostWithInvalidField = await postWithInvalidField.save();
        expect(savedPostWithInvalidField._id).toBeDefined();
        expect(savedPostWithInvalidField.votes).toBeUndefined();
    });


    it('Add Post with a Missing * Field', async () => {
        const postWithoutRequiredField = new PostModel({ title: 'Ooops! No description here' });
        let err;
        try {
            const savedPostWithoutRequiredField = await postWithoutRequiredField.save();
            error = savedPostWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.description).toBeDefined();
    });


})