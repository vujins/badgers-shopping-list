export const LocalDevelopmentSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Local Development Setup</h2>
      <div className="space-y-4">
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">1. Clone and Install:</h3>
          <pre className="text-green-400 overflow-x-auto">
            {`# Clone the repository
git clone https://github.com/your-username/azure-web-app.git
cd azure-web-app

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
