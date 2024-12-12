const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'default_secret_key'; // Fallback for development

const verifyToken = (req, res, next) => {
    try {
        const token =
            req.cookies?.token || req.headers?.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ message: 'Token is required' });
        }
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).send({ message: 'Invalid token format' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).send({ message: 'Invalid token when decode' });
        }

        req.userId = decoded.userId;
        req.role = decoded.role;

        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);

        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token has expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: 'Invalid token format' });
        }

        return res.status(401).send({ message: 'Error while verifying token' });
    }
};

module.exports = verifyToken;
