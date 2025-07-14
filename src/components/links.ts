export const links = {
  azureRoot: 'https://portal.azure.com',
  akaMs: 'http://aka.ms/azure-web-app',
  akaMsRoot: 'https://aka.ms',
  azureSubscription:
    'https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/overview',
  appRegistration:
    'https://ms.portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/b8a49903-6fac-45f9-a1a1-3717b12d70ea/isMSAApp~/false',
  microsoftTenantIssuerUrl: 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/v2.0',
  webAppService:
    'https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/451c83f5-4265-425a-9b44-c12bc2d76801/resourceGroups/web-app-guide/providers/Microsoft.Web/sites/web-app-guide/appServices',

  repoLink: 'https://github.com/kredenac/azure-web-app',

  azureAppServiceDocs: 'https://docs.microsoft.com/en-us/azure/app-service/',
  azureAppServiceGithub: 'https://github.com/Azure/app-service-linux-docs',
  azureLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',

  vscode: 'https://code.visualstudio.com',
  node: 'https://nodejs.org',
  react: 'https://react.dev',
  tailwind: 'https://tailwindcss.com',
  typescript: 'https://www.typescriptlang.org',
  vite: 'https://vitejs.dev',

  contactEmail: createContactEmail(),
};

function createContactEmail(): string {
  const puzzle = [
    { char: 'o', pos: 13 },
    { char: 'n', pos: 0 },
    { char: 'f', pos: 16 },
    { char: 'i', pos: 1 },
    { char: 't', pos: 17 },
    { char: 'd', pos: 2 },
    { char: 'c', pos: 19 },
    { char: 'i', pos: 3 },
    { char: 'o', pos: 20 },
    { char: 'm', pos: 4 },
    { char: 'm', pos: 21 },
    { char: 'i', pos: 5 },
    { char: 's', pos: 14 },
    { char: 't', pos: 6 },
    { char: 'o', pos: 15 },
    { char: 'r', pos: 7 },
    { char: '.', pos: 18 },
    { char: '@', pos: 8 },
    { char: 'c', pos: 11 },
    { char: 'm', pos: 9 },
    { char: 'r', pos: 12 },
    { char: 'i', pos: 10 },
  ];

  return puzzle
    .sort((a, b) => a.pos - b.pos)
    .map(item => item.char)
    .join('');
}
