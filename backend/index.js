const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Photo = require('./models/Photo');

const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const photosRouter = require('./routes/photos');

app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/photos', photosRouter);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sync models
        await sequelize.sync({ alter: true });
        console.log('Database synced.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
