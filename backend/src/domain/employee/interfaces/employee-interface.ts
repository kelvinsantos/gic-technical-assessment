import { Cafe } from '../../cafe/models/cafe-types';
import {
  CreateEmployeeRequest,
  EmployeeFilter,
  UpdateEmployeeRequest
} from '../models/employee-types';

export default interface EmployeeService {
  create(requestData: CreateEmployeeRequest): Promise<any>;
  findEmployeeById(id: string): Promise<any>;
  findEmployees(filter: EmployeeFilter): Promise<any>;
  updateEmployeeById(
    id: string,
    updateEmployeeRequest: UpdateEmployeeRequest
  ): Promise<any>;
  deleteEmployeeById(id: string): Promise<any>;
  countEmployeeByCafeId(cafeId: string): Promise<any>;
  deleteEmployeeByCafeId(cafeId: string): Promise<any>;
}
