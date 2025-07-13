// Example of importing an image (method 2)

export const OverviewSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-3xl font-bold text-gray-900">Azure Web Apps Tutorial</h2>
      </div>

      <p className="text-lg text-gray-700">
        This tutorial will guide you through setting up and deploying a full-stack React and Node.js application to
        Azure Web Apps with CI/CD through GitHub Actions.
      </p>

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
          <em>Azure Web Apps deployment architecture</em>
        </p>
      </div>

      {/* Alternative image examples */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Image Handling Examples:</h4>
        <div className="text-sm text-gray-700 space-y-2">
          <div className="flex items-start space-x-2">
            <span className="font-medium text-blue-600">1. Public folder:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs">src="/image.png"</code>
            <span>- For static assets, SEO-friendly</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium text-green-600">2. Import:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs">import img from './image.png'</code>
            <span>- Optimized by build tools (used for logo above)</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium text-purple-600">3. External:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs">src="https://example.com/image.png"</code>
            <span>- External URLs</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white rounded border">
          <h5 className="font-semibold text-gray-800 mb-2">🎯 Best Practices:</h5>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>
              • Use <strong>public folder</strong> for large images, logos, and SEO assets
            </li>
            <li>
              • Use <strong>imports</strong> for component-specific images that benefit from bundling
            </li>
            <li>
              • Always include meaningful <code>alt</code> attributes for accessibility
            </li>
            <li>
              • Use responsive classes like <code>max-w-full h-auto</code> for responsive images
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-semibold text-blue-900">What You'll Learn:</h3>
        <ul className="mt-2 text-blue-800 space-y-1">
          <li>• How to configure Azure Web Apps</li>
          <li>• Setting up GitHub Actions for CI/CD</li>
          <li>• Deploying React frontend and Node.js backend together</li>
          <li>• Configuring authentication and custom domains</li>
          <li>• Managing environment variables and app settings</li>
        </ul>
      </div>
    </div>
  );
};
