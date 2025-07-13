# User-Facing README

Access the website [here](ganttapi-azb0dwemccbxbwds.westeurope-01.azurewebsites.net)

An interactive Gantt chart application for managing DevOps workflows, built with Vite, React, Tailwind, Node and Express.
Both client and backend are deployed on Azure Web App.

====

- After installing the extension, open it
- Sign in with microsoft account
- Click on `Azure App Service`
- Create new web app (Advanced)
- Subscription: `NLX Service Dev`
- Location: North Europe
- Hostname: Secure unique default hostname
- Resource group: + Create a new resource group. Name it however you want.
- Stack: Node 20LTS
- OS: Linux
- App Service Plan: Create a new one
- Pricing tier: Free (F1)
- Application Insights Resource: gantt2

The output of created resources is written in the terminal.

To deploy first time manually:

- Within your Web App, go to settings->Environment Variables, and set `SCM_DO_BUILD_DURING_DEPLOYMENT` to false (disables npm ci)
- Click on Azure App Service again
- `Deploy to Web App...`
- Select your folder
- Select NLX Service Dev as Subscription
- Select the resource you just created

[do this later]
To Automate deployment via CI/CD

- The code here works with CI/CD, but that requires a paid plan on Azure to work well.
- Because for a fast CI/CD we just zip source files and run `npm ci` on Azure, but free tier throttles it.
- As a workaround, we can do a slower CI/CD that zips node_modules too, avoiding `npm ci` on Azure-side.
- Go to Azure portal for your web app, and do the same as in this image /public/screenshot
- This will commit a yaml file into `.github/workfows`.
- It uploads an artifact from build step just to immediately download it in deploy step. This quickly breaches Github free tier quotas.
- To mitigate, remove the middle part and put it all in 1 stage. You can just copy the values of `client`, `tenant`, and `subscription` IDs in `Login to Azure` step, and update the app-name in the last step

====

## Development Setup

### Prerequisites

- Node.js 20.x

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/kredenac/azure-web-app
   cd azure-web-app
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

- Configure environment variable APP_DATA_FILE_PATH to point to folder with gantt-chart data.
- If APP_DATA_FILE_PATH is empty, current folder in terminal (usually project root) will be used.
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

1. [Azure Subscription](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/overview). This is internal subscription we can use.
1. [Storage Account example (not used by this app)](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/asset/Microsoft_Azure_Storage/StorageAccount/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/resourceGroups/gantt2_group/providers/Microsoft.Storage/storageAccounts/gantapistoragestd). It is mounted on the web app, so you can access it via https://ganttapi-azb0dwemccbxbwds.scm.westeurope-01.azurewebsites.net/DebugConsole/?shell=powershell at `C:\mounts\sample1\`
1. [Web App Service](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/resourceGroups/web-app-guide/providers/Microsoft.Web/sites/web-app-guide/appServices)
1. [App resource group](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/resourceGroups/web-app-guide/overview)
1. I have Added on the App Registration itself [here](https://ms.portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Authentication/appId/b8a49903-6fac-45f9-a1a1-3717b12d70ea/isMSAApp~/false) a platform configuration (web) to enable token Id.
1. Tenant Id: 72f988bf-86f1-41af-91ab-2d7cd011db47
1. Backend App Id: b8a49903-6fac-45f9-a1a1-3717b12d70ea
1. To logout from webpage go to https://ganttapi-azb0dwemccbxbwds.westeurope-01.azurewebsites.net/.auth/logout
