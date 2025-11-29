const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');

const { verifyToken } = require('../middleware/auth');

// GET comments for a post
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId },
            include: [{ model: User, as: 'author', attributes: ['displayName', 'photoURL'] }],
            order: [['createdAt', 'ASC']],
        });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create comment (Protected)
router.post('/', verifyToken, async (req, res) => {
    try {
        const { content, postId } = req.body;

        const comment = await Comment.create({
            content,
            postId,
            authorId: req.dbUser.id,
        });

        const commentWithAuthor = await Comment.findByPk(comment.id, {
            include: [{ model: User, as: 'author', attributes: ['displayName', 'photoURL'] }]
        });

        res.status(201).json(commentWithAuthor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
