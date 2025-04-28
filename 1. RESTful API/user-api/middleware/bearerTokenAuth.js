import {
    MOCK_AUTHORIZED_USER,
    MOCK_AUTHORIZED_USER_2
} from "../utils/constants.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing.' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Invalid authorization format. Expected Bearer token.' });
    }

    // For now, simulate token validation
    // In real system you would decode JWT here
    const mockTokenToUser = {
        'faketoken_user1': MOCK_AUTHORIZED_USER,
        'faketoken_user2': MOCK_AUTHORIZED_USER_2
    };

    const user = mockTokenToUser[token];

    if (!user) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    // Attach user info to request
    req.user = user;

    next();
}

export default authMiddleware;
