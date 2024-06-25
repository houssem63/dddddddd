// authMiddleware.js
const jwt = require('jsonwebtoken');

function authorize(role) {
    return (req, res, next) => {
        // Get token from request headers
        const token = req.headers.authorization.split(' ')[1];

        // Verify token
        jwt.verify(token, process.env.TOKENSECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            
            // Check if user has required role
            if (decodedToken.role !== role) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            // User is authorized, continue to next middleware/route handler
            next();
        });
    };
}

module.exports = { authorize };
