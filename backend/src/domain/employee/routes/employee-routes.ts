import { Request, Router } from 'express';
import {
  ApiKeyValidation,
  RequestValidation,
  RegisterErrorCodeHandler,
  ContextualHandleRequest,
  BuildResponse
} from 'tsw-utilities';
import {
  JEmployeeResponse,
  JEmployeesResponse,
  JEmployeeRequestParams,
  JPostEmployeeRequestParams,
  JDeleteEmployeeResponse,
  JEmployeesRequestQuery
} from '../validations/employee-validations';
import { EmployeeModelErrorCodes } from '../constants/employee-errors';
import EmployeeController from '../controllers/employee-controller';
import EmployeeService from '../services/employee-service';

const router = Router();

const getApiKey = () => process.env.X_API_KEY;

export default (): Router => {
  const employeeController = new EmployeeController(new EmployeeService());

  router.post(
    '/employees',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      body: JPostEmployeeRequestParams
    }),
    RegisterErrorCodeHandler({
      [EmployeeModelErrorCodes.DUPLICATE_EMPLOYEE_ERROR]: 409
    }),
    ContextualHandleRequest(async (req: Request) => {
      return employeeController.create(req.body);
    }),
    BuildResponse(JEmployeeResponse)
  );

  router.get(
    '/employees/:id',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      params: JEmployeeRequestParams
    }),
    RegisterErrorCodeHandler({
      [EmployeeModelErrorCodes.EMPLOYEE_NOT_FOUND_ERROR]: 404
    }),
    ContextualHandleRequest(async (req: Request) => {
      return employeeController.get(req.params.id);
    }),
    BuildResponse(JEmployeeResponse)
  );

  router.get(
    '/employees',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      query: JEmployeesRequestQuery
    }),
    ContextualHandleRequest(async (req: Request) => {
      return employeeController.list(req.query);
    }),
    BuildResponse(JEmployeesResponse)
  );

  router.put(
    '/employees/:id',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      params: JEmployeeRequestParams,
      body: JPostEmployeeRequestParams
    }),
    RegisterErrorCodeHandler({
      [EmployeeModelErrorCodes.EMPLOYEE_NOT_FOUND_ERROR]: 404
    }),
    ContextualHandleRequest(async (req: Request) => {
      return employeeController.update(req.params.id, req.body);
    }),
    BuildResponse(JEmployeeResponse)
  );

  router.delete(
    '/employees/:id',
    ApiKeyValidation(getApiKey()),
    RequestValidation({
      params: JEmployeeRequestParams
    }),
    RegisterErrorCodeHandler({
      [EmployeeModelErrorCodes.EMPLOYEE_NOT_FOUND_ERROR]: 404
    }),
    ContextualHandleRequest(async (req: Request) => {
      return employeeController.delete(req.params.id);
    }),
    BuildResponse(JDeleteEmployeeResponse)
  );

  return router;
};
