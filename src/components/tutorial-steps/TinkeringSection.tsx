import { links } from '../links';

export const TinkeringSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Tinkering</h2>

      <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
        <h3 className="font-semibold text-purple-900">URL Shortening with aka.ms</h3>
        <p className="text-purple-800 mt-2">
          Once your Azure Web App is deployed, you can create a memorable shorthand URL using Microsoft's aka.ms
          service. This is especially useful for sharing your application with others or creating easy-to-remember
          links.
        </p>
        <p className="text-purple-800 mt-2">
          <strong>Example:</strong> This website has{' '}
          <a
            href={links.akaMs}
            className="bg-purple-100 px-2 py-1 rounded text-purple-700 underline hover:text-purple-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            {links.akaMs}
          </a>
        </p>
        <p className="text-purple-800 mt-2">
          Visit{' '}
          <a href={links.akaMsRoot} className="text-purple-600 underline hover:text-purple-800">
            aka.ms
          </a>{' '}
          to create your custom shorthand URL that redirects to your Azure Web App.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Husky Git Hooks Setup</h3>
          <p className="text-gray-300 mb-3">
            This project uses Husky to enforce code quality before pushing to specific branches:
          </p>
          <pre className="text-green-400 overflow-x-auto text-sm">
            {`# Pre-push hook (only runs on deploy_msit branch):
# .husky/pre-push -> scripts/pre-push.js

✅ Runs build verification
✅ Runs test suite  
✅ Verifies server startup
✅ Confirms server responds on port 3002

# Additional hooks you can add:
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/commit-msg "npx commitlint --edit"
npx husky add .husky/pre-push "npm run type-check"`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Azure Blob Storage</h3>
          <p className="text-blue-800">
            This example uses local file storage for simplicity. For production apps requiring scalable file storage,
            integrating Azure Blob Storage is left as an exercise for the reader. Consider using{' '}
            <code className="bg-blue-100 px-2 py-1 rounded">@azure/storage-blob</code> for seamless cloud storage
            integration.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">Debug Configuration (.vscode/launch.json)</h3>
          <p className="text-blue-800 mb-3">Three debug configurations for different scenarios:</p>
          <div className="bg-white border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-semibold text-blue-900">"Attach to Server"</h4>
              <p className="text-blue-700 text-sm">Attaches to running dev server on port 9229</p>
              <p className="text-blue-600 text-sm italic">For debugging server-side code during development</p>
            </div>
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-semibold text-blue-900">"Debug Jest - Run All Tests"</h4>
              <p className="text-blue-700 text-sm">Runs complete test suite with debugging</p>
              <p className="text-blue-600 text-sm italic">Executes App.test.tsx with full debugging support</p>
            </div>
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-semibold text-blue-900">"Debug Jest - Run Single Test"</h4>
              <p className="text-blue-700 text-sm">Runs specific test with pattern matching</p>
              <p className="text-blue-600 text-sm italic">
                Prompts for test name pattern, useful for focused debugging
              </p>
            </div>
          </div>
          <p className="text-blue-800 mt-3 text-sm">
            <strong>Usage:</strong> Press F5 or go to Run → Start Debugging, then select your desired configuration
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="font-semibold text-yellow-900">Additional Development Tools:</h3>
          <ul className="mt-2 text-yellow-800 space-y-1">
            <li>
              • <strong>Prettier:</strong> Auto-formats code on save with comprehensive ignore patterns
            </li>
            <li>
              • <strong>Jest:</strong> Unit testing with DOM support and{' '}
              <a
                href={links.react}
                className="text-yellow-600 hover:text-yellow-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>{' '}
              Testing Library
            </li>
            <li>
              • <strong>Concurrently:</strong> Runs client and server in parallel during development
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
