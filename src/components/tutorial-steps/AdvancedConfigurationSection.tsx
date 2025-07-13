export const AdvancedConfigurationSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Advanced Configuration</h2>
      <div className="space-y-4">
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">web.config (for IIS hosting)</h3>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="dist/server/index.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="StaticContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
          </conditions>
          <action type="Rewrite" url="dist/server/index.js"/>
        </rule>
      </rules>
    </rewrite>
    <defaultDocument>
      <files>
        <add value="dist/server/index.js"/>
      </files>
    </defaultDocument>
  </system.webServer>
</configuration>`}
          </pre>
        </div>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Custom Domain Configuration</h3>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`# In Azure Portal → Web App → Custom domains
# 1. Add custom domain: yourdomain.com
# 2. Verify domain ownership via DNS or HTML file
# 3. Configure SSL certificate:
#    - Use managed certificate (free) OR
#    - Upload your own certificate

# DNS Configuration (example)
Type: CNAME
Name: www
Value: my-gantt-webapp.azurewebsites.net

# For root domain (example)
Type: A
Name: @
Value: [IP from Azure portal]`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Environment Variables & App Settings:</h3>
          <p className="text-blue-800 mb-3">
            Configure in Azure Portal → Web App → Configuration → Application settings:
          </p>
          <ul className="text-blue-800 space-y-1">
            <li>
              • <code className="bg-blue-100 px-2 py-1 rounded">NODE_ENV</code> = production
            </li>
            <li>
              • <code className="bg-blue-100 px-2 py-1 rounded">WEBSITE_NODE_DEFAULT_VERSION</code> = ~20
            </li>
            <li>
              • <code className="bg-blue-100 px-2 py-1 rounded">SCM_DO_BUILD_DURING_DEPLOYMENT</code> = true
            </li>
            <li>
              • <code className="bg-blue-100 px-2 py-1 rounded">GANTT_DATA_FILE_PATH</code> = ./public/storage.json
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Application Insights (Monitoring)</h3>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`# Enable Application Insights in Azure Portal:
# Web App → Application Insights → Turn on Application Insights

# In your Node.js app, add monitoring:
npm install applicationinsights

# In your server/index.ts:
import * as appInsights from 'applicationinsights';

if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  appInsights.setup().start();
}`}
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="font-semibold text-yellow-900">Scaling & Performance:</h3>
          <ul className="mt-2 text-yellow-800 space-y-1">
            <li>
              • <strong>Scale up:</strong> Increase instance size (CPU/RAM)
            </li>
            <li>
              • <strong>Scale out:</strong> Add more instances (horizontal scaling)
            </li>
            <li>
              • <strong>Always On:</strong> Keep app warm (available in Basic+ tiers)
            </li>
            <li>
              • <strong>Auto-scale:</strong> Scale based on CPU, memory, or custom metrics
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
