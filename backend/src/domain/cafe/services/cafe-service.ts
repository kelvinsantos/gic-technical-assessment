import _ from 'lodash';
import ServiceBuilderUtil from '../../../utils/service-builder-util';
import Cafe from '../models/cafe-models';
import { CafeFilter, CafeRequest } from '../models/cafe-types';

/**
 * @module cafe-service.ts
 * @description Module used for calling cafe service.
 * @version 1.0
 * @since October 20, 2020
 */
class CafeService extends ServiceBuilderUtil {
  /**
   * @async
   * @method create
   * @description Model used for creating cafe
   * @param {CafeRequest} requestData
   * @param {string} requestData.name
   * @returns Cafe object
   */
  public async create(requestData: CafeRequest): Promise<any> {
    try {
      const cafe = await Cafe.create(requestData);

      return cafe.toJSON();
    } catch (e) {
      if (e.message.indexOf('E11000') >= 0) {
        // throw DUPLICATE_EMPLOYEE_ERROR
        // if the cafe already exist on our database
        throw new this.StandardModelError(
          null,
          this.TSWServiceErrorCodes.CAFE_MODEL_ERROR_CODES.DUPLICATE_CAFE_ERROR,
          this.TSWServiceErrorMessages.CAFE_MODEL_ERROR_MESSAGES.DUPLICATE_CAFE_ERROR,
          requestData
        );
      }
    }
  }

  /**
   * @async
   * @method findCafeById
   * @description Model used for finding cafe by id
   * @param {string} id
   * @param {string} requestData.id ID of the cafe for retrieval
   * @returns Cafe object
   * @throws CAFE_NOT_FOUND_ERROR
   */
  public async findCafeById(id: string): Promise<any> {
    const cafe = await Cafe.findOne({ _id: id });

    if (_.isEmpty(cafe)) {
      // throw CAFE_NOT_FOUND_ERROR
      // if the cafe does not exist on our database
      throw new this.StandardModelError(
        null,
        this.TSWServiceErrorCodes.CAFE_MODEL_ERROR_CODES.CAFE_NOT_FOUND_ERROR,
        this.TSWServiceErrorMessages.CAFE_MODEL_ERROR_MESSAGES.CAFE_NOT_FOUND_ERROR,
        { id }
      );
    }

    return cafe.toJSON();
  }

  /**
   * @async
   * @method findCafeByName
   * @description Model used for finding cafe by name
   * @param {string} name
   * @param {string} requestData.name Name of the cafe for retrieval
   * @returns Cafe object
   * @throws CAFE_NOT_FOUND_ERROR
   */
  public async findCafeByName(name: string): Promise<any> {
    const cafe = await Cafe.findOne({ name: name });

    if (_.isEmpty(cafe)) {
      // throw CAFE_NOT_FOUND_ERROR
      // if the cafe does not exist on our database
      throw new this.StandardModelError(
        null,
        this.TSWServiceErrorCodes.CAFE_MODEL_ERROR_CODES.CAFE_NOT_FOUND_ERROR,
        this.TSWServiceErrorMessages.CAFE_MODEL_ERROR_MESSAGES.CAFE_NOT_FOUND_ERROR,
        { name }
      );
    }

    return cafe.toJSON();
  }

  /**
   * @async
   * @method findCafes
   * @description Model used for finding cafes
   * @returns Cafes array of object
   */
  public async findCafes(filter: CafeFilter): Promise<any> {
    const cafes = await Cafe.find(filter).limit(1000);

    if (!_.isEmpty(cafes)) {
      return {
        cafes: JSON.parse(JSON.stringify(cafes))
      };
    }

    return {
      cafes: []
    };
  }

  /**
   * @async
   * @method updateCafeById
   * @description Model used for updating cafes
   * @returns Cafe object
   */
  public async updateCafeById(
    id: string,
    requestData: CafeRequest
  ): Promise<any> {
    const cafe = await Cafe.findOneAndUpdate({ _id: id }, requestData, {
      returnOriginal: false,
      returnDocument: 'after'
    });

    if (!cafe) {
      // throw CAFE_NOT_FOUND_ERROR
      // if the cafe does not exist on our database
      throw new this.StandardModelError(
        null,
        this.TSWServiceErrorCodes.CAFE_MODEL_ERROR_CODES.CAFE_NOT_FOUND_ERROR,
        this.TSWServiceErrorMessages.CAFE_MODEL_ERROR_MESSAGES.CAFE_NOT_FOUND_ERROR,
        { id }
      );
    }

    return cafe.toJSON();
  }

  /**
   * @async
   * @method deleteCafeById
   * @description Model used for deleting cafes
   * @returns Cafe object
   */
  public async deleteCafeById(id: string): Promise<any> {
    const cafe = await Cafe.deleteOne({ _id: id });

    if (!cafe) {
      // throw CAFE_NOT_FOUND_ERROR
      // if the cafe does not exist on our database
      throw new this.StandardModelError(
        null,
        this.TSWServiceErrorCodes.CAFE_MODEL_ERROR_CODES.CAFE_NOT_FOUND_ERROR,
        this.TSWServiceErrorMessages.CAFE_MODEL_ERROR_MESSAGES.CAFE_NOT_FOUND_ERROR,
        { id }
      );
    }

    if (cafe.deletedCount === 1) {
      return { success: true };
    }
    return { success: false };
  }
}

export = CafeService;
