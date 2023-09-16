import compression from 'compression';
import express from 'express';
import expressValidation from 'express-validation';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';

import cors from 'cors';

import { ErrorHandler, UncaughtExceptionHandler } from 'tsw-utilities';

import logger from './config/winston';
import mongoConfig from './config/mongo';
import domainRoutes from './domain';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeConfig();
  }

  public initializeConfig(): void {
    // initialize express middleware
    this.app.use(cors());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb' }));

    /**
     * [Morgan](https://github.com/expressjs/morgan)
     * Use logger before routes so it logs all requests
     *
     * By default, morgan sends the output to stdout which is the console
     *  `app.use(morgan('common'));`
     *
     * Custom log output example:
     *  `app.use(morgan(':date[iso] :method :url :response-time'));`
     *
     * Configure morgan to send the output to our logger's stream instead
     */
    if (!['test'].includes(process.env.NODE_ENV)) {
      this.app.use(
        morgan('combined', {
          stream: {
            write: (message) => logger.info(message)
          }
        })
      );

      // use compression
      this.app.use(compression());
    }

    // initialize all domain routes
    this.app.use(domainRoutes());

    // catch-all endpoint if client makes request to non-existent endpoint
    this.app.use('*', function (req, res) {
      res.status(404).json({ message: 'Not Found' });
    });

    this.app.use(ErrorHandler(logger, expressValidation.validate));
    this.app.set('logger', logger);

    process.on('uncaughtException', UncaughtExceptionHandler(logger));

    if (!['test'].includes(process.env.NODE_ENV)) {
      // initialize database
      const databaseUrl = mongoConfig.native.uri;
      mongoose.connect(databaseUrl).catch((err) => {
        console.log('Could not connect to database:', err); // eslint-disable-line
      });

      this.app.use(express.static(path.join(__dirname, 'public')));
    }
  }
}

export default new Server().app;
