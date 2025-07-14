import { links } from '../links';

export const LocalDevelopmentSection = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-green-800">🚀 Try It Out Locally First</h3>
          <p className="text-green-700 mb-3">
            Want to test this application locally before setting up deployment? Clone the original repository:
          </p>
          <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
            {`# Clone the original repository to try it out
git clone ${links.repoLink}.git
cd azure-web-app

# Install dependencies and run
npm install
npm run dev`}
          </pre>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-blue-800">⚠️ Important: Fork or Copy Repository for Deployment</h3>
          <p className="text-blue-700 mb-3">To deploy to Azure, you need to have your own copy of this repository:</p>
          <ul className="text-blue-700 space-y-2 ml-4">
            <li className="flex items-start">
              <span className="font-semibold mr-2">Option 1:</span>
              <span>Fork this repository on GitHub to your own account</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Option 2:</span>
              <span>Copy the code to a new repository in your GitHub account</span>
            </li>
          </ul>
          <p className="text-blue-700 text-sm mt-3">
            This is required because GitHub Actions will deploy from your repository to your Azure Web App.
          </p>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">1. Clone Your Repository:</h3>
          <pre className="text-green-400 overflow-x-auto">
            {`# Clone YOUR forked/copied repository
git clone https://github.com/YOUR-USERNAME/repository-name.git
cd repository-name

# Install dependencies
npm install`}
          </pre>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">2. Start Development Servers:</h3>
          <pre className="text-green-400 overflow-x-auto">
            {`# Start both client and server in development mode
npm run dev

# Or start them separately:
npm run dev:client    # Frontend on http://localhost:3000
npm run dev:server    # Backend on http://localhost:3002`}
          </pre>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">3. Build for Production:</h3>
          <pre className="text-green-400 overflow-x-auto">
            {`# Build both client and server
npm run build

# Test production build locally
npm start`}
          </pre>
        </div>
      </div>
    </div>
  );
};
