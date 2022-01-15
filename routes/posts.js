const express = require('express');
const router = express.Router();
const Post = require('../models/Post')


// Fetch all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);

    } catch (error) {
        res.json({ message: error });
    }
});

// Add a new post
router.post('/', async (req, res) => {
    try {

        const savedpost = await new Post({
            title: req.body.title,
            description: req.body.description

        })
        const userPost = await savedpost.save();
        res.status(201).json(userPost);

    } catch (error) {
        res.status(500).json(error);
    }
})

// Get a single post
router.get('/:postID', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error })
    }

});
// Update a post
router.patch('/:postID', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postID },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            }
        )
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({ message: error })
    }

});
// Delete a post

router.delete('/:postID', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postID })
        res.status(204).json(removedPost)
    } catch (error) {
        res.status(500).json({ message: error })
    }

});

module.exports = router;