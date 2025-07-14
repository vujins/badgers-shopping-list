# Azure Web App guide

Note: All links to Azure are internal and accessible only via internal company accounts.

Access the website [here](https://web-app-guide-feeuembjhvhveudu.northeurope-01.azurewebsites.net/)

A web app serving as a guide to build and deploy web apps to Azure. Built with Vite, React, Tailwind, Node and Express.
Both client and backend are deployed on Azure Web App.

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
