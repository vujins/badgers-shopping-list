import { useEffect, useState } from 'react';
import { Achievement } from '../hooks/useProgress';

interface AchievementBadgesProps {
  unlockedAchievements: Achievement[];
  availableAchievements: Achievement[];
  newAchievements: Achievement[];
  onDismissNewAchievements: () => void;
  className?: string;
}

export const AchievementBadges = ({
  unlockedAchievements,
  availableAchievements,
  newAchievements,
  onDismissNewAchievements,
  className = '',
}: AchievementBadgesProps) => {
  const [showAll, setShowAll] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (newAchievements.length > 0) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        onDismissNewAchievements();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [newAchievements, onDismissNewAchievements]);

  const renderBadge = (achievement: Achievement, isUnlocked: boolean) => (
    <div
      key={achievement.id}
      className={`
        relative p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
        ${
          isUnlocked
            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg'
            : 'bg-gray-50 border-gray-200 opacity-60'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div className={`text-2xl ${isUnlocked ? 'animate-pulse' : 'grayscale'}`}>{achievement.icon}</div>
        <div className="flex-1">
          <h3 className={`font-semibold text-sm ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
            {achievement.title}
          </h3>
          <p className={`text-xs ${isUnlocked ? 'text-gray-700' : 'text-gray-400'}`}>{achievement.description}</p>
        </div>
      </div>

      {isUnlocked && (
        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-xs">✓</span>
        </div>
      )}
    </div>
  );

  const allAchievements = [...unlockedAchievements, ...availableAchievements];
  const displayedAchievements = showAll ? allAchievements : allAchievements.slice(0, 3);

  return (
    <div className={className}>
      {/* Achievement Notification */}
      {showNotification && newAchievements.length > 0 && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-2xl border border-purple-300 animate-bounce">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <h3 className="font-bold text-sm">Achievement Unlocked!</h3>
                  <p className="text-xs opacity-90">{newAchievements[0].title}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowNotification(false);
                  onDismissNewAchievements();
                }}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Badges Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🏆</span>
            <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {unlockedAchievements.length}/{allAchievements.length}
            </span>
          </div>

          {allAchievements.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full"
            >
              <svg
                className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {unlockedAchievements.length === 0 && (
          <div className="text-center py-1 text-gray-500">
            <span className="text-4xl mb-2 block">🎯</span>
            <p className="text-sm">Complete sections to unlock achievements!</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {displayedAchievements.map(achievement =>
            renderBadge(
              achievement,
              unlockedAchievements.some(unlocked => unlocked.id === achievement.id)
            )
          )}
        </div>
      </div>
    </div>
  );
};
