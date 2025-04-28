import Joi from 'joi';

export const registrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    dateOfBirth: Joi.date().iso().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    address: Joi.string().required(),
    subscribeToNewsletter: Joi.boolean().required()
});

export const editProfileSchema = Joi.object({
    dateOfBirth: Joi.date().iso(),
    gender: Joi.string().valid('male', 'female', 'other'),
    address: Joi.string(),
    subscribeToNewsletter: Joi.boolean()
}).min(1); // Require at least one field to update

export const passwordChangeSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'Confirm password does not match new password'
    })
});
