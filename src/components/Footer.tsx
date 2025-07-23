import { links } from './links';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className=" mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href={links.azureAppServiceDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Azure App Service Documentation
                </a>
              </li>
              <li>
                <a
                  href={links.azureAppServiceGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  App Service GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={links.azureRoot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Azure Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              <a
                href={links.react}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors"
              >
                React
              </a>
              <a
                href={links.node}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition-colors"
              >
                Node.js
              </a>
              <a
                href={links.typescript}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
              >
                TypeScript
              </a>
              <a
                href={links.tailwind}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition-colors"
              >
                Tailwind CSS
              </a>
              <a
                href={links.vite}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700 transition-colors"
              >
                Vite.js
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links for this guide</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href={links.azureSubscription}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Azure Subscription
                </a>
              </li>
              <li>
                <a
                  href={links.appRegistration}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  App Registration
                </a>
              </li>
              <li>
                <a
                  href={links.webAppService}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Web App Service
                </a>
              </li>
              <li>
                <a
                  href={links.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Questions or feedback?</p>
            <a href={`mailto:${links.contactEmail}`} className="text-blue-400 hover:text-blue-300 transition-colors">
              {links.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 Azure Web Apps Guide. Vibe coded with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};
