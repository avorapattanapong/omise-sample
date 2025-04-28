import express from 'express';
import authMiddleware from '../middleware/bearerTokenAuth.js';
import memberService from '../services/users.js';
import {
    editProfileSchema,
    passwordChangeSchema,
    registrationSchema
} from "../validators/users.js";
import {validateAuthUser} from "../utils/authUtils.js";

const router = express.Router();

// Register User - POST /api/users
// No authentication required
router.post('/', async (req, res) => {
    try {
        await registrationSchema.validateAsync(req.body);
        const newUser = await memberService.register(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.details?.[0]?.message || err.message });
    }
});

// Get User - GET /api/users/:userId
router.get('/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    if (!userId) return res.status(404).json({ error: "Member not found." });

    // Return viewable user (sensitive data removed)
    const user = await memberService.getUser(userId);
    if (!user) return res.status(404).json({ error: "Member not found." });

    res.json(user);
});

// Update User - PUT /api/users/:userId
router.put('/:userId', authMiddleware, async (req, res) => {
    const authError = validateAuthUser(req);
    if (authError) {
        return res.status(authError.status).json({ error: authError.message });
    }

    try {
        const { userId } = req.params;
        if (!userId) return res.status(404).json({ error: "Member not found." });

        await editProfileSchema.validateAsync(req.body);

        // Return viewable user (sensitive data removed)
        const updatedMember = await memberService.updateProfile(userId, req.body);
        if (!updatedMember) return res.status(404).json({ error: "Member not found." });

        res.json(updatedMember);
    } catch (err) {
        res.status(400).json({ error: err.details?.[0]?.message || err.message });
    }
});

// Delete User - DELETE /api/users/:userId
router.delete('/:userId', authMiddleware, async (req, res) => {
    const authError = validateAuthUser(req);
    if (authError) {
        return res.status(authError.status).json({ error: authError.message });
    }

    const { userId } = req.params;
    if (!userId) return res.status(404).json({ error: "Member not found." });

    const success = await memberService.deleteProfile(userId);
    if (!success) return res.status(404).json({ error: "Member not found." });

    res.status(204);
});

// Change Password - POST /api/users/:userId/password
router.post('/:userId/password', authMiddleware, async (req, res) => {
    const authError = validateAuthUser(req);
    if (authError) {
        return res.status(authError.status).json({ error: authError.message });
    }

    try {
        const { userId } = req.params;
        if (!userId) return res.status(404).json({ error: "Member not found." });

        await passwordChangeSchema.validateAsync(req.body);

        const success = await memberService.updatePassword(userId, req.body.currentPassword, req.body.newPassword);
        if (!success) return res.status(400).json({ error: "Something went wrong" });

        res.json({ message: "Password changed successfully." });
    } catch (err) {
        res.status(400).json({ error: err.details?.[0]?.message || err.message });
    }
});

export default router;
