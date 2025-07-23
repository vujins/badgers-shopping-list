import { links } from '../links';

export const VibingSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Prepare to Vibe 🪄</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">First a short intro on project structure and tech stack</h3>
        <pre className="bg-black text-green-400 p-4 rounded text-sm overflow-x-auto">
          {`azure-web-app/
├── src/
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── api/                # API client utilities
│   ├── server/             # Express.js backend
│   │   ├── index.ts        # Server entry point
│   │   └── routes/         # API routes
│   ├── App.tsx             # Main React component
│   └── main.tsx            # React entry point
├── public/                 # Static assets`}
        </pre>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Key Technologies:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900">Frontend</h4>
            <ul className="mt-2 text-blue-800 space-y-1">
              <li>
                •{' '}
                <a
                  href={links.react}
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </a>{' '}
                18 with{' '}
                <a
                  href={links.typescript}
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TypeScript
                </a>
              </li>
              <li>• Vite for build tooling</li>
              <li>
                •{' '}
                <a
                  href={links.tailwind}
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>{' '}
                for styling
              </li>
              <li>• Jest for testing</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900">Backend</h4>
            <ul className="mt-2 text-green-800 space-y-1">
              <li>
                •{' '}
                <a
                  href={links.node}
                  className="text-green-600 hover:text-green-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Node.js
                </a>{' '}
                with Express
              </li>
              <li>
                •{' '}
                <a
                  href={links.typescript}
                  className="text-green-600 hover:text-green-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TypeScript
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Get Started with GitHub Copilot Chat:</h3>
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-purple-900 mb-4">
            Start with the following steps to get into the Vibe:
          </p>
          
          <div className="space-y-3 text-purple-800">
            <div className="flex items-start space-x-3">
              <span className="bg-purple-200 text-purple-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
              <span>Open GitHub Copilot Chat by pressing <kbd className="bg-purple-200 px-2 py-1 rounded text-sm">Ctrl+Shift+I</kbd></span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-purple-200 text-purple-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
              <span>Ensure "Agent" mode is selected</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-purple-200 text-purple-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
              <span>Set the model to "Claude Sonnet 4"</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-purple-200 text-purple-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">4</span>
              <span>Run it with the prompt: <code className="bg-purple-200 px-2 py-1 rounded text-sm">"Delete all of the code within `src` for folders `components`, `hooks`, and `utils`.
Instead of that, create me a fun web app, leveraging existing repository structure, where random visual effects track my mouse cursor"</code></span>
            </div>
          </div>

          <div className="mt-6">
            <img 
              src="/chat.png" 
              alt="GitHub Copilot Chat setup steps showing Ctrl+Shift+I, Agent mode, Claude Sonnet 4 model selection, and test prompt"
              className="w-full rounded-lg border border-purple-200 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
        <h3 className="text-xl font-semibold text-indigo-900 mb-3">🎉 Now Have Fun Creating Your App!</h3>
        <p className="text-indigo-800 leading-relaxed">
          You're all set! With GitHub Copilot Chat configured and ready to go, you can now unleash your creativity. 
          The prompt above will help you build something fun and interactive, but feel free to experiment with your own ideas. 
          The beauty of having an AI coding assistant is that you can iterate quickly, try new approaches, and learn as you build. 
          Happy coding! ✨
        </p>
      </div>
    </div>
  );
};
