import express from 'express';
import { tokenExchangeSchema } from '../validators/auth.js';
import authService from '../services/auth.js';

const router = express.Router();

// Token Exchange - POST /api/auth/token
router.post('/token', async (req, res) => {
    try {
        await tokenExchangeSchema.validateAsync(req.body);

        const tokenResponse = await authService.exchangeToken(req.body);
        res.json(tokenResponse);
    } catch (err) {
        res.status(400).json({ error: err.details?.[0]?.message || err.message });
    }
});

export default router;
