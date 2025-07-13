export const DeploymentProcessSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Deployment Process</h2>
      <div className="space-y-4">
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <h3 className="font-semibold text-green-900">Automatic Deployment</h3>
          <p className="mt-2 text-green-800">
            Once configured, every push to your main branch will trigger an automatic deployment.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">Deployment Steps:</h3>
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <div>
                <h4 className="font-semibold">Code Push</h4>
                <p className="text-gray-600">Push your code to GitHub main branch</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <h4 className="font-semibold">GitHub Actions Trigger</h4>
                <p className="text-gray-600">Workflow automatically starts building</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <h4 className="font-semibold">Build Process</h4>
                <p className="text-gray-600">Frontend and API are built separately</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                4
              </span>
              <div>
                <h4 className="font-semibold">Deployment</h4>
                <p className="text-gray-600">Assets are deployed to Azure Static Web Apps</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                ✓
              </span>
              <div>
                <h4 className="font-semibold">Live Site</h4>
                <p className="text-gray-600">Your app is now live at your Azure URL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
