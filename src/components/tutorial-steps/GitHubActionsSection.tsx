export const GitHubActionsSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">GitHub Actions Configuration</h2>
      <p className="text-gray-700">
        When you configure deployment from GitHub in Azure Web Apps, it will automatically create a GitHub Actions
        workflow file. Here's what it should look like:
      </p>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">.github/workflows/main_my-gantt-webapp.yml</h3>
        <pre className="text-green-400 overflow-x-auto text-sm">
          {`name: Build and deploy Node.js app to Azure Web App

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: npm install, build, and test
        run: |
          npm install
          npm run build --if-present
          npm run test --if-present

      - name: Zip artifact for deployment
        run: zip -r release.zip . -x "*.git*" "*node_modules*" "*.env*"

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v3
        with:
          name: node-app
          path: release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'Production'
      url: \${{ steps.deploy-to-webapp.outputs.webapp-url }}

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v3
        with:
          name: node-app

      - name: Unzip artifact for deployment
        run: unzip release.zip

      - name: Deploy to Azure Web App
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'my-gantt-webapp'
          slot-name: 'Production'
          publish-profile: \${{ secrets.AZUREAPPSERVICE_PUBLISHPROFILE_XXXXX }}
          package: .`}
        </pre>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 className="font-semibold text-yellow-900">Important Notes:</h3>
        <ul className="mt-2 text-yellow-800 space-y-1">
          <li>
            • The workflow file name includes your app name (e.g., <code>main_my-gantt-webapp.yml</code>)
          </li>
          <li>• Azure automatically creates the publish profile secret in your GitHub repository</li>
          <li>• The workflow builds the entire application and deploys it as a zip file</li>
          <li>• Both frontend and backend are deployed together in the same container</li>
        </ul>
      </div>
    </div>
  );
};
