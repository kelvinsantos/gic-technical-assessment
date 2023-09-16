import {
  StandardModelError,
  StandardModelErrorCodes,
  StandardModelErrorMessages
} from './standard-model-error-util';

/**
 * @module service-builder-util.ts
 * @description Module used for building services.
 * @version 1.0
 * @since October 20, 2020
 */
class ServiceBuilderUtil {
  // error handler
  StandardModelError = StandardModelError;

  TSWServiceErrorCodes = StandardModelErrorCodes;

  TSWServiceErrorMessages = StandardModelErrorMessages;
}

export = ServiceBuilderUtil;
