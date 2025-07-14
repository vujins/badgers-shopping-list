import { links } from '../links';

export const AzureWebAppSetupSection = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h3 className="font-semibold text-blue-900">Step 1: Install Azure Extension</h3>
          <p className="mt-2 text-blue-800">
            Install the Azure App Service extension in{' '}
            <a
              href={links.vscode}
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visual Studio Code
            </a>{' '}
            and sign into it with your Microsoft account.
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <h3 className="font-semibold text-green-900">Step 2: Create Azure Web App</h3>
          <p className="mt-2 text-green-800">After installing the extension:</p>
          <ol className="mt-3 text-green-800 space-y-2">
            <li>1. Open the Azure extension</li>
            <li>
              2. Click on <strong>Azure App Service</strong>
              <div className="mt-3">
                <img
                  src="/AzureExtensionAppService.png"
                  alt="Azure App Service Extension in VS Code"
                  className="border border-gray-300 rounded-lg shadow-sm max-w-full h-auto"
                />
              </div>
            </li>
            <li>
              3. Click onCreate new web app (<strong>Advanced</strong>)
            </li>
            <li>4. Setup the configuration as in the schema below:</li>
          </ol>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Web AppConfiguration:</h4>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Subscription:</span>
              <span className="col-span-2">NLX Service Dev</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Location:</span>
              <span className="col-span-2">North Europe</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Hostname:</span>
              <span className="col-span-2">Secure unique default hostname</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Resource Group:</span>
              <span className="col-span-2">
                Create new: <code className="bg-gray-100 px-2 py-1 rounded">Name it however you want</code>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Stack:</span>
              <span className="col-span-2">Node 20LTS</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">OS:</span>
              <span className="col-span-2">
                Linux. <em>(Windows is finnicky with Node, and requires ISS as a runtime)</em>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">App Service Plan:</span>
              <span className="col-span-2">Create a new one</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Pricing tier:</span>
              <span className="col-span-2">Free (F1)</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium">Application Insights:</span>
              <span className="col-span-2">gantt2 (Piggy back on the existing one)</span>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 border-l-4 border-teal-400 p-4">
          <h3 className="font-semibold text-teal-900">Step 3: Configure Environment Variables</h3>
          <p className="mt-2 text-teal-800">
            Before deploying, configure your Web App to avoid npm throttling on the free tier which is too weak for
            bunch of packages.
          </p>
          <ol className="mt-3 text-teal-800 space-y-2">
            <li>1. Go to your Web App in Azure Portal</li>
            <li>
              2. Navigate to <strong>Settings</strong> → <strong>Environment Variables</strong>
            </li>
            <li>
              3. Set <code className="bg-teal-100 px-2 py-1 rounded">SCM_DO_BUILD_DURING_DEPLOYMENT</code> to{' '}
              <code className="bg-teal-100 px-2 py-1 rounded">false</code>
            </li>
            <li>4. This disables npm ci during deployment and prevents throttling on the free tier</li>
          </ol>
          <div className="mt-3">
            <img
              src="/disable_npm.png"
              alt="Disable npm build during deployment in Azure Environment Variables"
              className="border border-gray-300 rounded-lg shadow-sm max-w-full h-auto"
            />
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
          <h3 className="font-semibold text-purple-900">Step 4: Manual Deployment</h3>
          <p className="mt-2 text-purple-800">
            For first deployment and to verify things work, let's first manually deploy.
          </p>
          <ol className="mt-3 text-purple-800 space-y-2">
            <li>
              1. Build files for deployment with <code className="bg-purple-100 px-2 py-1 rounded">npm run build</code>
            </li>
            <li>
              2. Click on <strong>Azure App Service</strong> again
            </li>
            <li>
              3. Select <strong>Deploy to Web App...</strong>
            </li>
            <li>4. Select your project folder</li>
            <li>
              5. Select <strong>NLX Service Dev</strong> as Subscription
            </li>
            <li>6. Select the resource you just created</li>
          </ol>
          <p className="mt-3 text-purple-700 text-sm">
            The names of created resources were written in the terminal from step 2. You can also search for them on the
            Azure Portal.
          </p>
        </div>
      </div>
    </div>
  );
};
