import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      name: Joi.string().required().trim(),
      password: Joi.string().required().min(6),
      phone: Joi.string()
        .pattern(/^[0-9]{8,15}$/)
        .required()
        .trim()
        .messages({
          'string.pattern.base':
            'Phone must be a number and between 8 and 15 digits',
        }),
      email: Joi.string().required().email().trim(),
      date_of_birth: Joi.string().required().trim(),
      zip_code: Joi.number().required(),
    });

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (!(error === undefined)) throw error;

    next();
  } catch (errors) {
    let errorsDetails: string[] = [];
    for (const error of errors.details) {
      errorsDetails.push(error.message);
    }
    errorsDetails = errorsDetails.map((details) =>
      details.replace(/\\/g, '').replace(/"/g, '')
    );
    res.status(400).json({
      message: errors.name,
      details: errorsDetails,
    });
  }
};
