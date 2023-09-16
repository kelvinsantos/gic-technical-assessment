import _ from 'lodash';
import EmployeeService from '../interfaces/employee-interface';
import {
  CreateEmployeeRequest,
  EmployeeFilter,
  UpdateEmployeeRequest
} from '../models/employee-types';

/**
 * @module employee-controller.ts
 * @description Module used for creating api controllers.
 * @version 1.0
 * @since September 10, 2023
 */
class EmployeeController {
  private readonly employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  /**
   * @module create
   * @description Controller for creating employee data
   * @version 1.0
   * @since September 10, 2023
   */
  public async create(
    createEmployeeRequest: CreateEmployeeRequest
  ): Promise<any> {
    try {
      return await this.employeeService.create(createEmployeeRequest);
    } catch (error) {
      // istanbul ignore next
      throw error;
    }
  }

  /**
   * @module get
   * @description Controller for getting employee data
   * @version 1.0
   * @since September 10, 2023
   */
  public async get(id: string): Promise<any> {
    try {
      return await this.employeeService.findEmployeeById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @module list
   * @description Controller for listing employees data
   * @version 1.0
   * @since September 10, 2023
   */
  public async list(employeeFilter: EmployeeFilter): Promise<any> {
    try {
      return await this.employeeService.findEmployees(
        _.pickBy(employeeFilter, _.identity)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @module update
   * @description Controller for updating employee data
   * @version 1.0
   * @since September 10, 2023
   */
  public async update(
    id: string,
    updateEmployeeRequest: UpdateEmployeeRequest
  ): Promise<any> {
    try {
      return await this.employeeService.updateEmployeeById(
        id,
        updateEmployeeRequest
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @module delete
   * @description Controller for deleting employee data
   * @version 1.0
   * @since September 10, 2023
   */
  public async delete(id: string): Promise<any> {
    try {
      return await this.employeeService.deleteEmployeeById(id);
    } catch (error) {
      throw error;
    }
  }
}

export = EmployeeController;
