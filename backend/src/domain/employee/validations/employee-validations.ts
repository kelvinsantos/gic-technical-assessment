import Joi from 'joi';

const ID_VALIDATION_REGEX = '^UI[a-zA-Z0-9_]{0,7}$';
const PHONE_NUMBER_VALIDATION_REGEX = '^(9|8)[0-9]{0,7}$';

export const JEmployeeResponse = Joi.object()
  .keys({
    id: Joi.string().regex(new RegExp(ID_VALIDATION_REGEX)).required(),
    name: Joi.string().required(),
    email_address: Joi.string().email().required(),
    phone_number: Joi.string()
      .regex(new RegExp(PHONE_NUMBER_VALIDATION_REGEX))
      .required(),
    days_worked: Joi.date().optional().allow(null),
    gender: Joi.string().valid('Male', 'Female').required(),
    cafe: Joi.object().keys({
      id: Joi.string().optional().allow(null),
      name: Joi.string().optional().allow(null),
      start_date: Joi.date().optional().allow(null)
    })
  })
  .required();

export const JPostEmployeeRequestParams = Joi.object()
  .keys({
    id: Joi.string().regex(new RegExp(ID_VALIDATION_REGEX)).required(),
    name: Joi.string().required(),
    email_address: Joi.string().email().required(),
    phone_number: Joi.string()
      .regex(new RegExp(PHONE_NUMBER_VALIDATION_REGEX))
      .required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    cafe: Joi.object().keys({
      id: Joi.string().optional().allow(null),
      name: Joi.string().optional().allow(null),
      start_date: Joi.number().optional().allow(null)
    })
  })
  .required();

export const JEmployeeRequestParams = Joi.object()
  .keys({
    id: Joi.string().regex(new RegExp(ID_VALIDATION_REGEX)).required()
  })
  .required();

export const JEmployeesRequestQuery = Joi.object()
  .keys({
    cafe: Joi.string().optional()
  })
  .required();

export const JEmployeesResponse = Joi.object().keys({
  employees: Joi.array()
    .items({
      id: Joi.string().regex(new RegExp(ID_VALIDATION_REGEX)).required(),
      name: Joi.string().required(),
      email_address: Joi.string().email().required(),
      phone_number: Joi.string()
        .regex(new RegExp(PHONE_NUMBER_VALIDATION_REGEX))
        .required(),
      gender: Joi.string().valid('Male', 'Female').required(),
      days_worked: Joi.number().optional().allow(null),
      cafe: Joi.string().optional().allow(null)
    })
    .optional()
});

export const JPutEmployeeRequestParams = Joi.object()
  .keys({
    name: Joi.string().required(),
    email_address: Joi.string().email().required(),
    phone_number: Joi.string()
      .regex(new RegExp(PHONE_NUMBER_VALIDATION_REGEX))
      .required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    cafe: Joi.object().keys({
      id: Joi.string().optional().allow(null),
      name: Joi.string().optional().allow(null),
      start_date: Joi.number().optional().allow(null)
    })
  })
  .required();

export const JDeleteEmployeeResponse = Joi.object()
  .keys({
    success: Joi.boolean().required()
  })
  .required();
