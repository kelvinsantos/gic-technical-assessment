import { IUnknwonObjectType } from '../types';

export default class CustomError extends Error {
  public error_code: string; // tslint:disable-line
  public lastError?: IUnknwonObjectType | null;
  public context?: IUnknwonObjectType | null;

  constructor(
    errorCode: string,
    message: string,
    lastError?: IUnknwonObjectType | null,
    context?: IUnknwonObjectType | null
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.error_code = errorCode;
    this.lastError = lastError;
    this.context = context;
  }
}
