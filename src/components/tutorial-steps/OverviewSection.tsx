// Example of importing an image (method 2)

export const OverviewSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-3xl font-bold text-gray-900">Azure Web Apps Guide</h2>
      </div>

      <p className="text-lg text-gray-700">
        This guide will guide you through setting up and deploying a full-stack React and Node.js application to Azure
        Web Apps with CI/CD through GitHub Actions.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-semibold text-blue-900">What You'll Learn:</h3>
        <ul className="mt-2 text-blue-800 space-y-1">
          <li>• Repo setup for prototyping deployable web apps</li>
          <li>• How to configure Azure Web Apps</li>
          <li>• Setting up GitHub Actions for CI/CD</li>
          <li>• Deploying React frontend and Node.js backend together</li>
          <li>• Configuring authentication </li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Architecture Overview</h3>
        <div className="flex justify-center">
          <img
            width={300}
            src="/cat.jpg"
            alt="Azure Web Apps Architecture Diagram showing the flow from React app and Node.js backend through GitHub to Azure hosting"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          <em>Here's a cat instead</em>
        </p>
      </div>
    </div>
  );
};
