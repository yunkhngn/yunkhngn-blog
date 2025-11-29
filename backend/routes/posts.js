const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const { upload } = require('../config/cloudinary');

const { verifyToken, isAdmin } = require('../middleware/auth');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows } = await Post.findAndCountAll({
            where: { published: true },
            include: [{ model: User, as: 'author', attributes: ['displayName', 'photoURL'] }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']],
        });

        res.json({
            total: count,
            pages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            posts: rows,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single post by slug
router.get('/:slug', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { slug: req.params.slug },
            include: [{ model: User, as: 'author', attributes: ['displayName', 'photoURL'] }],
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create post (Protected)
router.post('/', verifyToken, isAdmin, upload.single('coverImage'), async (req, res) => {
    try {
        const { title, slug, content, excerpt, published } = req.body;
        const coverImage = req.file ? req.file.path : null;

        const post = await Post.create({
            title,
            slug,
            content,
            excerpt,
            coverImage,
            published: published === 'true',
            authorId: req.dbUser.id,
            publishedAt: published === 'true' ? new Date() : null,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
