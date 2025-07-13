export const PrerequisitesSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Prerequisites</h2>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🚀 Strongly Recommended: AI Coding Assistants
            </h3>
          </div>
          <p className="text-gray-700 mb-2">
            For rapid prototype development, we <strong>highly recommend</strong> using AI coding assistants instead of
            manual coding:
          </p>
          <ul className="space-y-1 text-gray-700 ml-4">
            <li>
              • <strong>GitHub Copilot</strong> - AI pair programmer
            </li>
            <li>
              • <strong>Cursor Agent</strong> - AI-powered code editor
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-2 italic">
            These tools significantly accelerate development and reduce manual coding effort for prototypes.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Required Tools:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              • <strong>Node.js 20.x</strong> or later
            </li>
            <li>
              • <strong>Azure Account</strong> with active subscription. For internal use, access existing one via{' '}
              <a
                href="https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/overview"
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                NLX Service dev (internal)
              </a>
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

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h3 className="font-semibold text-blue-900">Platform Compatibility:</h3>
          <p className="text-blue-800">
            <strong>Note:</strong> This repository and all commands have been tested on Windows only.
          </p>
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

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
          <h3 className="font-semibold text-purple-900">VS Code Extensions:</h3>
          <p className="text-purple-800 mb-2">Install the Azure App Service extension for seamless deployment:</p>
          <ol className="list-decimal list-inside space-y-1 text-purple-700 ml-4">
            <li>Open VS Code</li>
            <li>
              Press <code className="bg-purple-100 px-1 rounded">Ctrl+Shift+X</code> to open Extensions
            </li>
            <li>Search for "Azure App Service"</li>
            <li>Install the extension by Microsoft</li>
            <li>Sign in with your Azure account when prompted</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
