export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Azure Static Web Apps Tutorial</h3>
            <p className="text-gray-400">
              A comprehensive guide to deploying full-stack React and Node.js applications on Azure Static Web Apps with
              authentication and CI/CD.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://docs.microsoft.com/en-us/azure/static-web-apps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Azure SWA Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Azure/static-web-apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  SWA GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://portal.azure.com"
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
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">React</span>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Node.js</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">TypeScript</span>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">Azure</span>
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">GitHub Actions</span>
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 Azure Static Web Apps Tutorial. Vibe coded with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};
