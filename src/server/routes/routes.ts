import dotenv from 'dotenv';
import express, { Router } from 'express';
import { getJsonContent, replaceJsonContent } from '../azure-blob.js';

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

router.get('/community', async (req, res) => {
  try {
    const data = await getJsonContent<CommunityData>('community.json');

    if (!data) {
      return res.json({ websites: [] });
    }

    res.json(data);
  } catch (error) {
    console.error('Error retrieving community data:', error);
    res.status(500).json({ error: 'Failed to retrieve community data' });
  }
});

router.post('/community', async (req, res) => {
  try {
    const { website } = req.body;

    if (!website || typeof website !== 'string') {
      return res.status(400).json({ error: 'Website URL is required' });
    }

    // Get existing data or initialize empty array
    let data = await getJsonContent<CommunityData>('community.json');
    if (!data) {
      data = { websites: [] };
    }

    // Add new website if it doesn't already exist
    if (!data.websites.includes(website)) {
      data.websites.push(website);
    }

    // Save updated data
    await replaceJsonContent('community.json', data);

    res.json(data);
  } catch (error) {
    console.error('Error saving community data:', error);
    res.status(500).json({ error: 'Failed to save community data' });
  }
});

export default router;
