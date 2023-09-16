import Joi from 'joi';

export const JCafeResponse = Joi.object()
  .keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    logo: Joi.string().optional(),
    location: Joi.string().required()
  })
  .required();

export const JPostCafeRequestParams = Joi.object()
  .keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    logo: Joi.string().optional(),
    location: Joi.string().required()
  })
  .required();

export const JCafeRequestParams = Joi.object()
  .keys({
    id: Joi.string().required()
  })
  .required();

export const JCafeRequestQuery = Joi.object()
  .keys({
    location: Joi.string().optional()
  })
  .required();

export const JCafesResponse = Joi.object().keys({
  cafes: Joi.array()
    .items({
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      logo: Joi.string().optional(),
      location: Joi.string().required(),
      employees: Joi.number().required()
    })
    .optional()
});

export const JPutCafeRequestParams = Joi.object()
  .keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    logo: Joi.string().optional(),
    location: Joi.string().required()
  })
  .required();

export const JDeleteCafeResponse = Joi.object()
  .keys({
    success: Joi.boolean().required()
  })
  .required();
