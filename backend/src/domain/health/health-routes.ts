import { Request, Response, Router } from 'express';

const router = Router();

export default (): Router => {
  router.get('/health', async (req: Request, res: Response) => {
    return res.send({ status: 'ok' });
  });

  return router;
};
