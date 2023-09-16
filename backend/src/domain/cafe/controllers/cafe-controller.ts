import _ from 'lodash';
import EmployeeService from '../../employee/interfaces/employee-interface';
import CafeService from '../interfaces/cafe-interface';
import { Cafe, CafeFilter, CafeRequest } from '../models/cafe-types';

/**
 * @module cafe-controller.ts
 * @description Module used for creating api controllers.
 * @version 1.0
 * @since September 10, 2023
 */
class CafeController {
  private readonly cafeService: CafeService;
  private readonly employeeService: EmployeeService;

  constructor(cafeService: CafeService, employeeService: EmployeeService) {
    this.cafeService = cafeService;
    this.employeeService = employeeService;
  }

  /**
   * @module create
   * @description Controller for creating cafe data
   * @version 1.0
   * @since September 10, 2023
   */
  public async create(createCafeRequest: CafeRequest): Promise<any> {
    try {
      return await this.cafeService.create(createCafeRequest);
    } catch (error) {
      // istanbul ignore next
      throw error;
    }
  }

  /**
   * @module get
   * @description Controller for getting cafe data
   * @version 1.0
   * @since September 10, 2023
   */
  public async get(id: string): Promise<any> {
    try {
      const cafe: Cafe = await this.cafeService.findCafeById(id);
      const employeeCount = this.employeeService.countEmployeeByCafeId(cafe.id);
      return {
        ...cafe,
        employees: employeeCount
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @module list
   * @description Controller for listing cafes data
   * @version 1.0
   * @since September 10, 2023
   */
  public async list(filter: CafeFilter): Promise<any> {
    try {
      const res = await this.cafeService.findCafes(
        _.pickBy(filter, _.identity)
      );

      const cafes = res.cafes.map(async (cafe: Cafe) => {
        const employeeCount = await this.employeeService.countEmployeeByCafeId(
          cafe.id
        );
        return {
          ...cafe,
          employees: employeeCount
        };
      });

      const finalCafes = await Promise.all(cafes);

      return {
        cafes: finalCafes.sort((a, b) => b.employees - a.employees)
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @module update
   * @description Controller for updating cafe data
   * @version 1.0
   * @since September 10, 2023
   */
  public async update(
    id: string,
    updateCafeRequest: CafeRequest
  ): Promise<any> {
    try {
      return await this.cafeService.updateCafeById(id, updateCafeRequest);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @module delete
   * @description Controller for deleting cafe data
   * @version 1.0
   * @since September 10, 2023
   */
  public async delete(id: string): Promise<any> {
    try {
      await this.cafeService.deleteCafeById(id);
      return await this.employeeService.deleteEmployeeByCafeId(id);
    } catch (error) {
      throw error;
    }
  }
}

export = CafeController;
