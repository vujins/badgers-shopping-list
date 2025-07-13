export const AzureSWASetupSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Azure Static Web App Setup</h2>
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h3 className="font-semibold text-blue-900">Step 1: Create Azure Static Web App</h3>
          <p className="mt-2 text-blue-800">Navigate to Azure Portal → Create a resource → Static Web App</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Configuration Details:</h4>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Subscription:</span>
              <span className="col-span-2">Your Azure subscription</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Resource Group:</span>
              <span className="col-span-2">
                Create new: <code className="bg-gray-100 px-2 py-1 rounded">my-swa-rg</code>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Name:</span>
              <span className="col-span-2">
                <code className="bg-gray-100 px-2 py-1 rounded">my-gantt-app</code>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Plan type:</span>
              <span className="col-span-2">Free (for development)</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Region:</span>
              <span className="col-span-2">West Europe</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Step 2: Configure Deployment Source</h3>
          <pre className="text-green-400 overflow-x-auto">
            {`Deployment source: GitHub
Organization: your-github-username
Repository: azure-web-app
Branch: main

Build Details:
App location: /          # Root directory
Api location: /api       # API routes location
Output location: dist    # Vite build output`}
          </pre>
        </div>
      </div>
    </div>
  );
};
