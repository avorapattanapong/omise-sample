import Joi from 'joi';

export const tokenExchangeSchema = Joi.object({
    grant_type: Joi.string().valid('authorization_code').required(),
    code: Joi.string().required(),
    redirect_uri: Joi.string().uri().required(),
    client_id: Joi.string().required()
});
