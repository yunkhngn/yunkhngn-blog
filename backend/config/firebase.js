const admin = require('firebase-admin');
require('dotenv').config();

if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('Firebase Admin initialized');
    } catch (error) {
        console.error('Firebase Admin initialization failed:', error.message);
    }
}

module.exports = admin;
