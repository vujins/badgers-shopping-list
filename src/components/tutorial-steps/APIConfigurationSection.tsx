export const APIConfigurationSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">API Configuration for Azure Web Apps</h2>
      <div className="space-y-4">
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <h3 className="font-semibold text-green-900">Good News: Standard Express.js APIs Work!</h3>
          <p className="mt-2 text-green-800">
            Unlike Azure Static Web Apps, Azure Web Apps can run your existing Express.js server directly. No need to
            restructure your API into separate Azure Functions.
          </p>
        </div>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Current API Structure (keep as is):</h3>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`src/
├── server/
│   ├── index.ts              # Express server
│   └── routes/
│       └── ganttRoutes.ts    # API routes
├── App.tsx                   # React app
└── main.tsx                  # Frontend entry`}
          </pre>
        </div>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Example server configuration (src/server/index.ts):</h3>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`import express from 'express';
import path from 'path';
import cors from 'cors';
import ganttRoutes from './routes/ganttRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', ganttRoutes);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
          </pre>
        </div>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Build script configuration (package.json):</h3>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`{
  "scripts": {
    "dev": "concurrently \\"npm run dev:client\\" \\"npm run dev:server\\"",
    "dev:client": "vite",
    "dev:server": "tsx watch src/server/index.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "tsc -p tsconfig.server.json",
    "start": "node dist/server/index.js",
    "test": "jest"
  }
}`}
          </pre>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h3 className="font-semibold text-blue-900">Key Configuration Points:</h3>
          <ul className="mt-2 text-blue-800 space-y-1">
            <li>
              • <strong>Port:</strong> Use <code>process.env.PORT</code> (Azure provides this)
            </li>
            <li>
              • <strong>Static files:</strong> Serve built React app from <code>dist/</code>
            </li>
            <li>
              • <strong>API routes:</strong> Prefix with <code>/api</code> to avoid conflicts
            </li>
            <li>
              • <strong>Catch-all route:</strong> Handle React Router by serving index.html
            </li>
            <li>
              • <strong>Build process:</strong> Both frontend and backend must be built
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
