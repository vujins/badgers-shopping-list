export const GitHubActionsSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">GitHub Actions Configuration</h2>
      <p className="text-gray-700">
        Azure will automatically create a GitHub Actions workflow file. Here's what it should look like:
      </p>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">.github/workflows/azure-static-web-apps.yml</h3>
        <pre className="text-green-400 overflow-x-auto text-sm">
          {`name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: \${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: \${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: "api"
          output_location: "dist"
          app_build_command: "npm run build:client"
          api_build_command: "npm run build:server"

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: \${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"`}
        </pre>
      </div>
    </div>
  );
};
