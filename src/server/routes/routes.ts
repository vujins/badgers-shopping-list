import dotenv from 'dotenv';
import express, { Router } from 'express';

dotenv.config();

console.log('server started');

const router: Router = express.Router();

interface CommunityData {
  websites: string[];
}

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
