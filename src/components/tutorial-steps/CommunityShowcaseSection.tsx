import { useEffect, useState } from 'react';
import { ProgressState } from '../../hooks/useProgress';

interface CommunityWebsite {
  websites: string[];
}

interface CommunityShowcaseSectionProps {
  markWebsiteSubmitted: () => void;
  progress: ProgressState;
}

export const CommunityShowcaseSection = ({ markWebsiteSubmitted, progress }: CommunityShowcaseSectionProps) => {
  const [websites, setWebsites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

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

  const handleWebsiteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!websiteUrl.trim()) return;

    setSubmitLoading(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website: websiteUrl.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit website');
      }

      // Update local state first
      setWebsites(prev => [...prev, websiteUrl.trim()]);
      setWebsiteUrl('');
      setSubmitMessage({ type: 'success', text: 'Website submitted successfully! 🎉' });

      // Trigger the achievement
      markWebsiteSubmitted();

      // Special celebration 🎉
      setTimeout(() => {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      }, 500);
    } catch (err) {
      setSubmitMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to submit website',
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading community websites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-500 text-xl">⚠️</span>
            <p className="text-red-700">Error loading community websites: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
          <span className="text-2xl text-white">🌟</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Showcase</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Congratulations on completing the Azure Web Apps Guide! Check out the amazing websites created by developers
          who followed this guide.
        </p>
      </div>

      {/* Success Message */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🎉</span>
          <div>
            <h3 className="text-lg font-semibold text-green-800">You Did It!</h3>
            <p className="text-green-700">
              You've successfully completed all sections of the Azure Web Apps Guide. Your website should now be live
              and accessible to the world!
            </p>
          </div>
        </div>
      </div>

      {/* Community Websites */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <span className="text-xl">🌐</span>
          <span>Community Websites</span>
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">{websites.length}</span>
        </h3>

        {websites.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">🚀</span>
            <p className="text-gray-600">Be the first to share your website with the community!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {websites.map((website, index) => (
              <div
                key={index}
                className="group bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900 truncate">{getDomain(website)}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-1">{formatUrl(website)}</p>
                  </div>

                  {isValidUrl(formatUrl(website)) && (
                    <a
                      href={formatUrl(website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Visit website"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* What's Next */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-xl">📈</span>
            <div>
              <h4 className="font-medium text-blue-800">Scale Your Application</h4>
              <p className="text-blue-700 text-sm">
                Explore Azure's scaling options to handle increased traffic and grow your application.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-xl">🔒</span>
            <div>
              <h4 className="font-medium text-blue-800">Enhance Security</h4>
              <p className="text-blue-700 text-sm">Add more cats and dogs to your website.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-xl">⚡</span>
            <div>
              <h4 className="font-medium text-blue-800">Optimize Performance</h4>
              <p className="text-blue-700 text-sm">Vibe code unoptimized websites for fun!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Your Website */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-purple-900 mb-2">Share Your Website! 🌟</h3>
          <p className="text-purple-700 text-lg">
            Show off your amazing creation to the world and inspire other developers!
          </p>
        </div>

        <form onSubmit={handleWebsiteSubmit} className="max-w-2xl mx-auto" action="#" method="post">
          <div className="space-y-4">
            <div>
              <label htmlFor="website-url" className="block text-sm font-medium text-purple-900 mb-2">
                Your Website URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="website-url"
                  value={websiteUrl}
                  onChange={e => setWebsiteUrl(e.target.value)}
                  placeholder="https://your-awesome-website.azurewebsites.net"
                  className="w-full px-4 py-4 text-lg border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  disabled={submitLoading || progress.websiteSubmitted}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-purple-400 text-2xl">🚀</span>
                </div>
              </div>
            </div>

            {submitMessage && (
              <div
                className={`p-4 rounded-lg ${
                  submitMessage.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                <p className="text-center font-medium">{submitMessage.text}</p>
              </div>
            )}

            {progress.websiteSubmitted ? (
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-lg">
                  <span className="text-2xl">✅</span>
                  <span className="font-semibold">Website Already Submitted!</span>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={submitLoading || !websiteUrl.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {submitLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>🎉</span>
                    <span>Submit My Website</span>
                    <span>🎉</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-purple-600">
          <p>✨ Submitting your website will unlock a special reward! ✨</p>
        </div>
      </div>
    </div>
  );
};
