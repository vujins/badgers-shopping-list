export const CodebaseStructureSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Understanding the Codebase</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Project Structure:</h3>
        <pre className="bg-black text-green-400 p-4 rounded text-sm overflow-x-auto">
          {`azure-web-app/
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── api/                # API client utilities
│   ├── server/             # Express.js backend
│   │   ├── index.ts        # Server entry point
│   │   └── routes/         # API routes
│   ├── App.tsx             # Main React component
│   └── main.tsx            # React entry point
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
└── server.js               # Production server`}
        </pre>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Key Technologies:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900">Frontend</h4>
            <ul className="mt-2 text-blue-800 space-y-1">
              <li>• React 18 with TypeScript</li>
              <li>• Vite for build tooling</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Jest for testing</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900">Backend</h4>
            <ul className="mt-2 text-green-800 space-y-1">
              <li>• Node.js with Express</li>
              <li>• TypeScript</li>
              <li>• CORS enabled</li>
              <li>• JSON file storage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
