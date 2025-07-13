export const TroubleshootingSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Common Issues & Solutions</h2>
      <div className="space-y-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <h3 className="font-semibold text-red-900">Application Start Issues</h3>
          <ul className="mt-2 text-red-800 space-y-1">
            <li>
              • Check if <code>npm start</code> script is properly configured
            </li>
            <li>
              • Verify <code>process.env.PORT</code> is used in your server
            </li>
            <li>
              • Ensure <code>WEBSITE_NODE_DEFAULT_VERSION</code> is set to ~20
            </li>
            <li>• Check Application Insights and Log Stream for startup errors</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="font-semibold text-yellow-900">Build & Deployment Failures</h3>
          <ul className="mt-2 text-yellow-800 space-y-1">
            <li>• Check GitHub Actions logs for build errors</li>
            <li>• Verify all dependencies are in package.json (not devDependencies)</li>
            <li>• Ensure both frontend and backend build successfully</li>
            <li>
              • Check if <code>SCM_DO_BUILD_DURING_DEPLOYMENT</code> is set to true
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h3 className="font-semibold text-blue-900">Static File Serving Issues</h3>
          <ul className="mt-2 text-blue-800 space-y-1">
            <li>• Verify React build files are in the correct dist/ folder</li>
            <li>• Check if express.static is configured correctly</li>
            <li>• Ensure catch-all route (*) serves index.html for SPA routing</li>
            <li>• Verify API routes are prefixed with /api to avoid conflicts</li>
          </ul>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
          <h3 className="font-semibold text-purple-900">Performance Issues</h3>
          <ul className="mt-2 text-purple-800 space-y-1">
            <li>• Enable "Always On" for Basic+ plans to avoid cold starts</li>
            <li>• Check if you need to scale up (more CPU/RAM) or scale out (more instances)</li>
            <li>• Monitor Application Insights for performance metrics</li>
            <li>• Consider using Azure CDN for static assets</li>
          </ul>
        </div>

        <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
          <h3 className="font-semibold text-gray-900">Useful Debugging Commands</h3>
          <pre className="mt-2 bg-black text-green-400 p-3 rounded text-sm overflow-x-auto">
            {`# View application logs in Azure Portal
# Web App → Monitoring → Log stream

# Enable detailed logging
# Web App → App Service logs → Turn on Application Logging

# SSH into container (Linux apps)
# Web App → Development Tools → SSH

# Check environment variables
# Web App → Configuration → Application settings`}
          </pre>
        </div>
      </div>
    </div>
  );
};
