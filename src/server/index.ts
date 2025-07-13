import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ganttRoutes from './routes/ganttRoutes.js';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use different ports for development vs production
const isDevelopment = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || (isDevelopment ? 3002 : 3000);

// Middleware
app.use(bodyParser.json());

// Enable CORS only in development mode (for localhost:3000 -> localhost:3002 requests)
if (isDevelopment) {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
}

app.use('/api', ganttRoutes);

// Only serve static files in production or when not in dev mode
if (!isDevelopment) {
  // Serve static files from Vite.js build
  app.use(express.static(path.join(__dirname, '../../dist/client')));

  // Serve the vite.js app for any other routes (fallback)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/client/index.html'));
  });
} else {
  // In development, just provide API endpoints
  app.get('/', (req, res) => {
    res.json({
      message: 'API Server running in development mode',
      port: PORT,
      endpoints: ['GET /api/'],
    });
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Serving static files from: ${path.join(__dirname, '../../dist/client')}`);
});
