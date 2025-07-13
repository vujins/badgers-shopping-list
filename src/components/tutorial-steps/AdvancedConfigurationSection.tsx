export const AdvancedConfigurationSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Advanced Configuration</h2>
      <div className="space-y-4">
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">staticwebapp.config.json</h3>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "auth": {
    "identityProviders": {
      "azureActiveDirectory": {
        "userDetailsClaim": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
        "registration": {
          "openIdIssuer": "https://login.microsoftonline.com/YOUR-TENANT-ID/v2.0",
          "clientIdSettingName": "AZURE_CLIENT_ID",
          "clientSecretSettingName": "AZURE_CLIENT_SECRET"
        }
      }
    }
  },
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/api/*"]
  }
}`}
          </pre>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Environment Variables:</h3>
          <p className="text-blue-800 mb-3">Configure in Azure Portal → Static Web App → Configuration:</p>
          <ul className="text-blue-800 space-y-1">
            <li>
              • <code className="bg-blue-100 px-2 py-1 rounded">AZURE_CLIENT_ID</code>
            </li>
            <li>
              • <code className="bg-blue-100 px-2 py-1 rounded">AZURE_CLIENT_SECRET</code>
            </li>
            <li>
              • <code className="bg-blue-100 px-2 py-1 rounded">GANTT_DATA_FILE_PATH</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
