const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const { upload, cloudinary } = require('../config/cloudinary');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET all photos
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST upload photo (Admin only)
router.post('/', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const photo = await Photo.create({
            title,
            description,
            imageUrl: req.file.path,
            publicId: req.file.filename,
        });

        res.status(201).json(photo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE photo (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const photo = await Photo.findByPk(req.params.id);

        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        // Delete from Cloudinary
        if (photo.publicId) {
            await cloudinary.uploader.destroy(photo.publicId);
        }

        await photo.destroy();
        res.json({ message: 'Photo deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
