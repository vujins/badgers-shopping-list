// Example of importing an image (method 2)
import { useEffect, useState } from 'react';

interface CommunityWebsite {
  websites: string[];
}

export const OverviewSection = () => {
  const [websites, setWebsites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunityWebsites = async () => {
      try {
        const response = await fetch('/api/community');
        if (!response.ok) {
          throw new Error('Failed to fetch community websites');
        }
        const data: CommunityWebsite = await response.json();
        setWebsites(data.websites || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityWebsites();
  }, []);

  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const getDomain = (url: string) => {
    try {
      const formattedUrl = formatUrl(url);
      const domain = new URL(formattedUrl).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-3xl font-bold text-gray-900"> Guide for Azure Web Apps</h2>
      </div>

      <p className="text-lg text-gray-700">
        This guide will guide you through setting up and deploying a full-stack React and Node.js application to Azure
        Web Apps with CI/CD through GitHub Actions.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-semibold text-blue-900">What You'll Learn:</h3>
        <ul className="mt-2 text-blue-800 space-y-1">
          <li>• Repo setup for prototyping deployable web apps</li>
          <li>• How to configure Azure Web Apps</li>
          <li>• Setting up GitHub Actions for CI/CD</li>
          <li>• Deploying React frontend and Node.js backend together</li>
          <li>• Configuring authentication </li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
        <p className="text-purple-800 text-center font-medium">
          🎉 <em>Complete all sections to unlock a special surprise!</em> ✨
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Architecture Overview</h3>
        <div className="flex justify-center">
          <img
            width={300}
            src="/cat.jpg"
            alt="Azure Web Apps Architecture Diagram showing the flow from React app and Node.js backend through GitHub to Azure hosting"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          <em>Here's a cat instead</em>
        </p>
      </div>

      {/* Community Websites Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <span className="text-xl">🌐</span>
          <span>Community Showcase</span>
          {!loading && !error && (
            <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md font-medium">{websites.length}</span>
          )}
        </h3>

        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600 text-sm">Loading community websites...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">Unable to load community websites</p>
          </div>
        ) : websites.length === 0 ? (
          <div className="text-center py-4">
            <span className="text-2xl mb-2 block">🚀</span>
            <p className="text-gray-600 text-sm">Be the first to share your website!</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4 text-sm">
              Check out the amazing websites created by developers who completed this guide:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {websites.slice(0, 6).map((website, index) => {
                const isValid = isValidUrl(formatUrl(website));
                const CardContent = (
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900 truncate">{website}</span>
                      </div>
                    </div>
                    <svg
                      className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                );

                return isValid ? (
                  <a
                    key={index}
                    href={formatUrl(website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-3 transition-all duration-200 hover:shadow-md block cursor-pointer"
                    title="Visit website"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div key={index} className="group bg-gray-50 border border-gray-200 rounded-lg p-3 opacity-60">
                    {CardContent}
                  </div>
                );
              })}
            </div>
            {websites.length > 6 && (
              <p className="text-center text-gray-500 text-sm mt-3">
                And {websites.length - 6} more amazing websites! Complete the guide to see them all.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
