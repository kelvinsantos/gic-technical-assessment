import appRoot from 'app-root-path';
import { createLogger, transports, format } from 'winston';

// https://gist.github.com/cklanac/97dda6a49fdd5ce1711c5cc3299ded50
const options = {
  info: {
    level: 'info',
    filename: `${appRoot}/logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  debug: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File(options.info),
    new transports.Console(options.debug)
  ],
  exitOnError: false // do not exit on handled exceptions
});

export default logger;
