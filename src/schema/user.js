import Joi from 'joi';

const userSignupSchema = Joi.object({
  username: Joi.string()
    .min(5)
    .max(50)
    .regex(/^[\w]+$/)
    .required(),
  fullName: Joi.string().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'password not match' }),
});

const userLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { userSignupSchema, userLoginSchema };
