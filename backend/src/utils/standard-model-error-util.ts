import CustomErrorUtil from './custom-error-util';
import {
  EmployeeModelErrorCodes,
  EmployeeModelErrorMsg
} from '../domain/employee/constants/employee-errors';
import {
  CafeModelErrorCodes,
  CafeModelErrorMsg
} from '../domain/cafe/constants/cafe-errors';

export class StandardModelError extends CustomErrorUtil {
  public static errorCode?: string;

  constructor(
    error: any,
    customErrorCode: any,
    customErrorMsg: any,
    context: any
  ) {
    super(
      customErrorCode || error.error_code || 'UNKNOWN',
      customErrorMsg || error.message || 'unknown',
      error,
      context
    );
  }
}

export class StandardModelErrorCodes {
  static get EMPLOYEE_MODEL_ERROR_CODES(): typeof EmployeeModelErrorCodes {
    return EmployeeModelErrorCodes;
  }
  static get CAFE_MODEL_ERROR_CODES(): typeof CafeModelErrorCodes {
    return CafeModelErrorCodes;
  }
}

export class StandardModelErrorMessages {
  static get EMPLOYEE_MODEL_ERROR_MESSAGES(): typeof EmployeeModelErrorMsg {
    return EmployeeModelErrorMsg;
  }
  static get CAFE_MODEL_ERROR_MESSAGES(): typeof CafeModelErrorMsg {
    return CafeModelErrorMsg;
  }
}
