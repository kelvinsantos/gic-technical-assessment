import _ from 'lodash';
import ServiceBuilderUtil from '../../../utils/service-builder-util';
import Employee from '../models/employee-models';
import {
  CreateEmployeeRequest,
  EmployeeFilter,
  UpdateEmployeeRequest
} from '../models/employee-types';

/**
 * @module employee-service.ts
 * @description Module used for calling employee service.
 * @version 1.0
 * @since October 20, 2020
 */
class EmployeeService extends ServiceBuilderUtil {
  /**
   * @async
   * @method create
   * @description Model used for creating employee
   * @param {CreateEmployeeRequest} requestData
   * @param {string} requestData.name
   * @returns Employee object
   */
  public async create(requestData: CreateEmployeeRequest): Promise<any> {
    try {
      const employee = await Employee.create(requestData);

      return employee.toJSON();
    } catch (e) {
      if (e.message.indexOf('E11000') >= 0) {
        // throw DUPLICATE_EMPLOYEE_ERROR
        // if the employee already exist on our database
        throw new this.StandardModelError(
          null,
          this.TSWServiceErrorCodes.EMPLOYEE_MODEL_ERROR_CODES.DUPLICATE_EMPLOYEE_ERROR,
          this.TSWServiceErrorMessages.EMPLOYEE_MODEL_ERROR_MESSAGES.DUPLICATE_EMPLOYEE_ERROR,
          requestData
        );
      }
    }
  }

  /**
   * @async
   * @method findEmployeeById
   * @description Model used for finding employee by id
   * @param {string} id
   * @param {string} requestData.id ID of the employee for retrieval
   * @returns Employee object
   * @throws EMPLOYEE_NOT_FOUND_ERROR
   */
  public async findEmployeeById(id: string): Promise<any> {
    const employee = await Employee.findOne({ _id: id });

    if (_.isEmpty(employee)) {
      // throw EMPLOYEE_NOT_FOUND_ERROR
      // if the employee does not exist on our database
      throw new this.StandardModelError(
        null,
        this.TSWServiceErrorCodes.EMPLOYEE_MODEL_ERROR_CODES.EMPLOYEE_NOT_FOUND_ERROR,
        this.TSWServiceErrorMessages.EMPLOYEE_MODEL_ERROR_MESSAGES.EMPLOYEE_NOT_FOUND_ERROR,
        { id }
      );
    }

    return employee.toJSON();
  }

  /**
   * @async
   * @method findEmployees
   * @description Model used for finding employees
   * @returns Employees array of object
   */
  public async findEmployees(employeeFilter: EmployeeFilter): Promise<any> {
    let filter = {};
    if (employeeFilter.cafe) {
      filter['cafe.name'] = employeeFilter.cafe;
    }

    const employees = await Employee.find(filter).limit(1000);

    if (!_.isEmpty(employees)) {
      const mappedEmployees = employees.map((employee) => {
        // calculate time difference
        const timeDifference =
          new Date().getTime() - new Date(employee.cafe?.start_date).getTime();

        // calculate days difference by dividing total milliseconds in a day
        var daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        return {
          ...employee.toJSON(),
          days_worked: !_.isEmpty(employee.cafe)
            ? Math.floor(daysDifference)
            : null,
          cafe: employee.cafe?.name ?? null
        };
      });

      return {
        employees: JSON.parse(JSON.stringify(mappedEmployees))
      };
    }

    return {
      employees: []
    };
  }

  /**
   * @async
   * @method updateEmployeeById
   * @description Model used for updating employees
   * @returns Employee object
   */
  public async updateEmployeeById(
    id: string,
    requestData: UpdateEmployeeRequest
  ): Promise<any> {
    const employee = await Employee.findOneAndUpdate({ _id: id }, requestData, {
      returnOriginal: false,
      returnDocument: 'after'
    });

    if (!employee) {
      // throw EMPLOYEE_NOT_FOUND_ERROR
      // if the employee does not exist on our database
      throw new this.StandardModelError(
        null,
        this.TSWServiceErrorCodes.EMPLOYEE_MODEL_ERROR_CODES.EMPLOYEE_NOT_FOUND_ERROR,
        this.TSWServiceErrorMessages.EMPLOYEE_MODEL_ERROR_MESSAGES.EMPLOYEE_NOT_FOUND_ERROR,
        { id }
      );
    }

    return employee.toJSON();
  }

  /**
   * @async
   * @method deleteEmployeeById
   * @description Model used for deleting employees
   * @returns Employee object
   */
  public async deleteEmployeeById(id: string): Promise<any> {
    const employee = await Employee.deleteOne({ _id: id });

    if (!employee) {
      // throw EMPLOYEE_NOT_FOUND_ERROR
      // if the employee does not exist on our database
      throw new this.StandardModelError(
        null,
        this.TSWServiceErrorCodes.EMPLOYEE_MODEL_ERROR_CODES.EMPLOYEE_NOT_FOUND_ERROR,
        this.TSWServiceErrorMessages.EMPLOYEE_MODEL_ERROR_MESSAGES.EMPLOYEE_NOT_FOUND_ERROR,
        { id }
      );
    }

    if (employee.deletedCount === 1) {
      return { success: true };
    }
    return { success: false };
  }

  /**
   * @async
   * @method countEmployeeByCafeId
   * @description Model used for counting employee by cafeId
   * @param {string} cafeId
   * @param {string} requestData.id ID of the cafe for retrieval
   * @returns Count of available employees
   */
  public async countEmployeeByCafeId(cafeId: string): Promise<any> {
    const employeesCount = await Employee.count({
      'cafe.id': cafeId
    });

    return employeesCount;
  }

  /**
   * @async
   * @method deleteEmployeeByCafeId
   * @description Model used for deleting employees
   * @returns Employee object
   */
  public async deleteEmployeeByCafeId(cafeId: string): Promise<any> {
    const employee = await Employee.deleteMany({ 'cafe.id': cafeId });

    if (!employee) {
      // throw EMPLOYEE_NOT_FOUND_ERROR
      // if the employee does not exist on our database
      throw new this.StandardModelError(
        null,
        this.TSWServiceErrorCodes.EMPLOYEE_MODEL_ERROR_CODES.EMPLOYEE_NOT_FOUND_ERROR,
        this.TSWServiceErrorMessages.EMPLOYEE_MODEL_ERROR_MESSAGES.EMPLOYEE_NOT_FOUND_ERROR,
        { cafeId }
      );
    }

    if (employee.acknowledged) {
      return { success: true };
    }
    return { success: false };
  }
}

export = EmployeeService;
