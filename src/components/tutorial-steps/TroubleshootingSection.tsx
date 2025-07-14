export const TroubleshootingSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Common Issues & Solutions</h2>
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-blue-800">🔧 Port Issues</h3>
          <p className="text-blue-700 mb-3">
            If you encounter port conflicts during development, you can kill processes using specific ports:
          </p>
          <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">{`npm run kill-port`}</pre>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-3">Local debugging (.vscode/launch.json)</h3>
          <p className="text-purple-800 mb-3">Three debug configurations for different scenarios:</p>
          <div className="bg-white border border-purple-200 rounded-lg p-4 space-y-3">
            <div className="border-l-4 border-purple-400 pl-4">
              <h4 className="font-semibold text-purple-900">"Attach to Server"</h4>
              <p className="text-purple-700 text-sm">Attaches to running dev server on port 9229</p>
              <p className="text-purple-600 text-sm italic">For debugging server-side code during development</p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h4 className="font-semibold text-purple-900">"Debug Jest - Run All Tests"</h4>
              <p className="text-purple-700 text-sm">Runs complete test suite with debugging</p>
              <p className="text-purple-600 text-sm italic">Executes App.test.tsx with full debugging support</p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h4 className="font-semibold text-purple-900">"Debug Jest - Run Single Test"</h4>
              <p className="text-purple-700 text-sm">Runs specific test with pattern matching</p>
              <p className="text-purple-600 text-sm italic">
                Prompts for test name pattern, useful for focused debugging
              </p>
            </div>
          </div>
          <p className="text-blue-800 mt-3 text-sm">
            <strong>Usage:</strong> Press F5 or go to Run → Start Debugging, then select your desired configuration
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-green-800">📊 Azure Portal Debugging</h3>
          <div className="text-green-700 space-y-3">
            <div>
              <h4 className="font-semibold">View Application Logs:</h4>
              <p>Navigate to Web App → Monitoring → Log stream in Azure Portal</p>
            </div>
            <div>
              <h4 className="font-semibold">Enable Detailed Logging:</h4>
              <p>Go to Web App → App Service logs → Turn on Application Logging</p>
            </div>
            <div>
              <h4 className="font-semibold">SSH into Container (Linux apps):</h4>
              <p>Access Web App → Development Tools → SSH</p>
            </div>
            <div>
              <h4 className="font-semibold">Check Environment Variables:</h4>
              <p>Navigate to Web App → Configuration → Application settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
