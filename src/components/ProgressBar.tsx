import { useEffect, useState } from 'react';

interface ProgressBarProps {
  percentage: number;
  completedSections: number;
  totalSections: number;
  className?: string;
}

export const ProgressBar = ({ percentage, completedSections, totalSections, className = '' }: ProgressBarProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  const getProgressColor = () => {
    if (percentage >= 100) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (percentage >= 75) return 'bg-gradient-to-r from-blue-500 to-purple-500';
    if (percentage >= 50) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (percentage >= 25) return 'bg-gradient-to-r from-orange-500 to-red-500';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const getProgressEmoji = () => {
    if (percentage >= 100) return '🎉';
    if (percentage >= 75) return '🚀';
    if (percentage >= 50) return '💪';
    if (percentage >= 25) return '🔥';
    return '🌱';
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-lg">{getProgressEmoji()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {completedSections} of {totalSections}
          </span>
          <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">{percentage}%</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: `${animatedPercentage}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>

          {/* Progress glow effect */}
          {percentage > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-20 animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Completion message */}
      {percentage === 100 && (
        <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="text-sm font-semibold text-green-800">Congratulations!</h3>
              <p className="text-xs text-green-700">You've completed the entire Azure Web Apps Guide!</p>
            </div>
          </div>
          <div className="mt-2 p-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-md">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🌟</span>
              <p className="text-xs text-purple-700">
                <strong>Community Showcase unlocked!</strong> Check out websites created by fellow developers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
