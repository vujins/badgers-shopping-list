export const PrerequisitesSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Prerequisites</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Required Tools:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              • <strong>Node.js 20.x</strong> or later
            </li>
            <li>
              • <strong>Azure Account</strong> with active subscription
            </li>
            <li>
              • <strong>GitHub Account</strong> for repository hosting
            </li>
            <li>
              • <strong>Git</strong> for version control
            </li>
            <li>
              • <strong>VS Code</strong> (recommended) with Azure extensions
            </li>
          </ul>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="font-semibold text-yellow-900">Azure CLI Setup:</h3>
          <pre className="mt-2 bg-black text-green-400 p-3 rounded text-sm overflow-x-auto">
            {`# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Verify login
az account show`}
          </pre>
        </div>
      </div>
    </div>
  );
};
