# User-Facing README

Access the website [here](ganttapi-azb0dwemccbxbwds.westeurope-01.azurewebsites.net)

An interactive Gantt chart application for managing DevOps workflows, built with Vite, React, Tailwind, Node and Express.
Both client and backend are deployed on Azure Web App.

## Development Setup

### Prerequisites

- Node.js 20.x

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/prjova37/Gantt
   cd Gantt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development servers**

   Starts both the client and backend

   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000` (vite js clietn server)
   - Backend API: `http://localhost:3000/api` (backend server)

## Testing Instructions

1. Run `npm test`
1. You can debug tests by pressing `Ctrl + Shift + D` to open Debug Tab
1. Then select either `Debug Jest - Run All Tests` or `Debug Jest - Run Single Test`
1. Set a breakpoint and then press F5 to launch

## Debugging instructions

To debug the client - just set a breakpoint in the browser DevTools.

To debug the server - open the debug tab and select `Attach to Server` (this assumes server is already running).

Production debugging tips:

1. Monitor the log stream [here](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/resourceGroups/gantt2_group/providers/Microsoft.Web/sites/ganttapi/logStream-quickstart)
1. Explore via powershell the web app [here](https://ganttapi-azb0dwemccbxbwds.scm.westeurope-01.azurewebsites.net/DebugConsole/?shell=powershell)

Note:

- Configure environment variable GANTT_DATA_FILE_PATH to point to folder with gantt-chart data.
- If GANTT_DATA_FILE_PATH is empty, current folder in terminal (usually project root) will be used.
- Check public/storage.json for filenames definition.

# 2. Production Testing

**Access the Application:**

1. Navigate to: `https://ganttapi-azb0dwemccbxbwds.westeurope-01.azurewebsites.net`
2. You'll be redirected to Microsoft login if not authenticated
3. Login with your `@microsoft.com` account
4. Access will be denied for non-Microsoft accounts

## Deployment

### Automatic Deployment

The application deploys automatically via GitHub Actions when code is pushed to the `deploy_msit` branch.

**Workflow**: `.github/workflows/deploy-unified-webapp.yml`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Relevant links:

1. [Storage Account](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/asset/Microsoft_Azure_Storage/StorageAccount/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/resourceGroups/gantt2_group/providers/Microsoft.Storage/storageAccounts/gantapistoragestd). It is mounted on the web app, so you can access it via https://ganttapi-azb0dwemccbxbwds.scm.westeurope-01.azurewebsites.net/DebugConsole/?shell=powershell at `C:\mounts\sample1\`
1. [ganttapi App Service](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/asset/WebsitesExtension/Website/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/resourceGroups/gantt2_group/providers/Microsoft.Web/sites/ganttapi)
1. [Gantt SWA - deprecated](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/asset/WebsitesExtension/StaticSite/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/resourceGroups/gantt2_group/providers/Microsoft.Web/staticSites/Gantt)
1. [gantt2_group resource group](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/asset/HubsExtension/ResourceGroups/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/resourceGroups/gantt2_group)
1. I have Added on the App Registration itself [here](https://ms.portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Authentication/appId/b8a49903-6fac-45f9-a1a1-3717b12d70ea/isMSAApp~/false) a platform configuration (web) to enable token Id.
1. Tenant Id: 72f988bf-86f1-41af-91ab-2d7cd011db47
1. App Id for registered SWA (not the SWA id itself): 5678b60a-ac95-4fd1-be02-356ab88df00a
1. Backend App Id: b8a49903-6fac-45f9-a1a1-3717b12d70ea
1. To logout from webpage go to https://ganttapi-azb0dwemccbxbwds.westeurope-01.azurewebsites.net/.auth/logout
