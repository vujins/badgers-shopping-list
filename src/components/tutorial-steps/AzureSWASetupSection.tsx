export const AzureSWASetupSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Azure Web Apps Setup</h2>
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h3 className="font-semibold text-blue-900">Step 1: Create Azure Web App</h3>
          <p className="mt-2 text-blue-800">Navigate to Azure Portal → Create a resource → Web App</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Basic Configuration:</h4>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Subscription:</span>
              <span className="col-span-2">NLX Service Dev</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Resource Group:</span>
              <span className="col-span-2">
                Create new: <code className="bg-gray-100 px-2 py-1 rounded">my-webapp-rg</code>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Name:</span>
              <span className="col-span-2">
                <code className="bg-gray-100 px-2 py-1 rounded">my-gantt-webapp</code> (must be globally unique)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Publish:</span>
              <span className="col-span-2">Code</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Runtime stack:</span>
              <span className="col-span-2">Node 20 LTS</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Operating System:</span>
              <span className="col-span-2">Linux</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Region:</span>
              <span className="col-span-2">West Europe</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Pricing plan:</span>
              <span className="col-span-2">F1 (Free) for testing, B1 (Basic) for production</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <h3 className="font-semibold text-green-900">Step 2: Configure Deployment Source</h3>
          <p className="mt-2 text-green-800">After creating the Web App, configure continuous deployment:</p>
          <ol className="mt-3 text-green-800 space-y-2">
            <li>1. Go to your Web App in Azure Portal</li>
            <li>
              2. Navigate to <strong>Deployment Center</strong> in the left sidebar
            </li>
            <li>
              3. Choose <strong>GitHub</strong> as the source
            </li>
            <li>4. Authenticate with GitHub if needed</li>
            <li>
              5. Select your repository: <code className="bg-green-100 px-2 py-1 rounded">azure-web-app</code>
            </li>
            <li>
              6. Choose branch: <code className="bg-green-100 px-2 py-1 rounded">main</code>
            </li>
            <li>
              7. Build provider: <strong>GitHub Actions</strong>
            </li>
            <li>
              8. Click <strong>Save</strong>
            </li>
          </ol>
        </div>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Step 3: Configure App Settings</h3>
          <p className="text-gray-300 mb-3">In Azure Portal → Web App → Configuration → Application settings:</p>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`# Required settings for Node.js app
SCM_DO_BUILD_DURING_DEPLOYMENT = true
WEBSITE_NODE_DEFAULT_VERSION = ~20
NODE_ENV = production

# Your app-specific settings
GANTT_DATA_FILE_PATH = ./public/storage.json

# Optional: Custom startup command
# Go to Configuration → General settings → Startup Command:
# npm start`}
          </pre>
        </div>
      </div>
    </div>
  );
};
