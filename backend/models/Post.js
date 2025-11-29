const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    excerpt: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
});

// Associations
Post.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
User.hasMany(Post, { foreignKey: 'authorId' });

module.exports = Post;
