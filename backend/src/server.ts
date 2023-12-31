import * as http from 'http';
import { NODE_ENV, PORT } from './config';

import app from '.';

const port = normalizePort(PORT);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
  const portCondition: number =
    typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(portCondition)) {
    return val;
  }
  if (portCondition >= 0) {
    return portCondition;
  }
  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(
    { name: ` template-nodejs listening on port ${bind}` },
    { NODE_ENV, port: bind }
  );
}
