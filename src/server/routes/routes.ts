import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    authEnabled: process.env.IS_AUTH_ENABLED !== 'false',
    token: req.headers['x-ms-token-aad-access-token'],
    'x-ms-client-principal': req.headers['x-ms-client-principal'],
  });
});

export default router;
