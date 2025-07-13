export const TroubleshootingSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Common Issues & Solutions</h2>
      <div className="space-y-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <h3 className="font-semibold text-red-900">Build Failures</h3>
          <ul className="mt-2 text-red-800 space-y-1">
            <li>• Check GitHub Actions logs for specific errors</li>
            <li>• Ensure all dependencies are listed in package.json</li>
            <li>• Verify API structure matches SWA requirements</li>
          </ul>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="font-semibold text-yellow-900">API Not Working</h3>
          <ul className="mt-2 text-yellow-800 space-y-1">
            <li>• Check API folder structure (api/function-name/index.ts)</li>
            <li>• Verify function exports are correct</li>
            <li>• Check Azure Functions runtime compatibility</li>
          </ul>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h3 className="font-semibold text-blue-900">Authentication Issues</h3>
          <ul className="mt-2 text-blue-800 space-y-1">
            <li>• Verify Azure AD app registration</li>
            <li>• Check redirect URLs in app registration</li>
            <li>• Ensure environment variables are set correctly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
