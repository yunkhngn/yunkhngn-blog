const admin = require('../config/firebase');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;

        // Sync user with DB
        const [user] = await User.findOrCreate({
            where: { firebaseUid: decodedToken.uid },
            defaults: {
                email: decodedToken.email,
                displayName: decodedToken.name || 'User',
                photoURL: decodedToken.picture,
                role: 'user', // Default role
            },
        });

        req.dbUser = user;
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.dbUser && req.dbUser.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Admin access required' });
    }
};

module.exports = { verifyToken, isAdmin };
