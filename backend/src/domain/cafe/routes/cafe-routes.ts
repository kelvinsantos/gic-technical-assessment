import { Request, Router } from 'express';
import {
  ApiKeyValidation,
  RequestValidation,
  RegisterErrorCodeHandler,
  ContextualHandleRequest,
  BuildResponse
} from 'tsw-utilities';
import {
  JCafeResponse,
  JCafesResponse,
  JCafeRequestParams,
  JPostCafeRequestParams,
  JDeleteCafeResponse,
  JCafeRequestQuery
} from '../validations/cafe-validations';
import { CafeModelErrorCodes } from '../constants/cafe-errors';
import CafeController from '../controllers/cafe-controller';
import { CafeRequest } from '../models/cafe-types';
import CafeService from '../services/cafe-service';
import EmployeeService from '../../employee/services/employee-service';

const router = Router();

const getApiKey = () => process.env.X_API_KEY;

export default (): Router => {
  const cafeController = new CafeController(
    new CafeService(),
    new EmployeeService()
  );

  router.post(
    '/cafes',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      body: JPostCafeRequestParams
    }),
    RegisterErrorCodeHandler({
      [CafeModelErrorCodes.DUPLICATE_CAFE_ERROR]: 409
    }),
    ContextualHandleRequest(async (req: Request) => {
      return cafeController.create(req.body);
    }),
    BuildResponse(JCafeResponse)
  );

  router.get(
    '/cafes/:id',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      params: JCafeRequestParams
    }),
    RegisterErrorCodeHandler({
      [CafeModelErrorCodes.CAFE_NOT_FOUND_ERROR]: 404
    }),
    ContextualHandleRequest(async (req: Request) => {
      return cafeController.get(req.params.id);
    }),
    BuildResponse(JCafeResponse)
  );

  router.get(
    '/cafes',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      query: JCafeRequestQuery
    }),
    ContextualHandleRequest(async (req: Request) => {
      return cafeController.list(req.query);
    }),
    BuildResponse(JCafesResponse)
  );

  router.put(
    '/cafes/:id',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      params: JCafeRequestParams,
      body: JPostCafeRequestParams
    }),
    RegisterErrorCodeHandler({
      [CafeModelErrorCodes.CAFE_NOT_FOUND_ERROR]: 404
    }),
    ContextualHandleRequest(async (req: Request) => {
      return cafeController.update(req.params.id, req.body);
    }),
    BuildResponse(JCafeResponse)
  );

  router.delete(
    '/cafes/:id',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      params: JCafeRequestParams
    }),
    RegisterErrorCodeHandler({
      [CafeModelErrorCodes.CAFE_NOT_FOUND_ERROR]: 404
    }),
    ContextualHandleRequest(async (req: Request) => {
      return cafeController.delete(req.params.id);
    }),
    BuildResponse(JDeleteCafeResponse)
  );

  return router;
};
