export const APIConfigurationSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">API Configuration for SWA</h2>
      <div className="space-y-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="font-semibold text-yellow-900">Important: API Structure for SWA</h3>
          <p className="mt-2 text-yellow-800">
            Azure Static Web Apps expects API functions in a specific structure. You need to restructure your Express
            routes.
          </p>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Create api/ directory structure:</h3>
          <pre className="text-green-400 overflow-x-auto">
            {`api/
├── gantt/
│   └── index.ts          # GET /api/gantt
├── gantt-update/
│   └── index.ts          # POST /api/gantt-update
└── package.json`}
          </pre>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Example API function (api/gantt/index.ts):</h3>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as fs from 'fs';
import * as path from 'path';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const dataPath = path.join(process.cwd(), 'public', 'storage.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        context.res = {
            status: 200,
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: 'Internal server error' }
        };
    }
};

export default httpTrigger;`}
          </pre>
        </div>
      </div>
    </div>
  );
};
