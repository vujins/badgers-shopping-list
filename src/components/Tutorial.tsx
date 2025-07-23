import { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { AchievementBadges } from './AchievementBadges';
import { ProgressBar } from './ProgressBar';
import { SectionCompleteButton } from './SectionCompleteButton';
import {
  AdvancedConfigurationSection,
  AuthenticationSection,
  AzureWebAppSetupSection,
  CommunityShowcaseSection,
  DeploymentProcessSection,
  GitHubActionsSection,
  LocalDevelopmentSection,
  OverviewSection,
  PrerequisitesSection,
  TroubleshootingSection,
  VibingSection
} from './tutorial-steps';

interface TutorialSection {
  id: string;
  title: string;
  component: React.ComponentType;
}

export const Tutorial = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const {
    progress,
    markSectionComplete,
    markSectionIncomplete,
    resetProgress,
    getProgressPercentage,
    getUnlockedAchievements,
    getAvailableAchievements,
    newAchievements,
    dismissNewAchievements,
    totalSections,
    markWebsiteSubmitted,
  } = useProgress();

  const baseSections: TutorialSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      component: OverviewSection,
    },
    {
      id: 'prerequisites',
      title: 'Prerequisites',
      component: PrerequisitesSection,
    },
    {
      id: 'local-setup',
      title: 'Local Development',
      component: LocalDevelopmentSection,
    },
    {
      id: 'codebase',
      title: 'Start Vibing',
      component: VibingSection,
    },
    {
      id: 'azure-web-app-setup',
      title: 'Azure Web App Setup',
      component: AzureWebAppSetupSection,
    },
    {
      id: 'github-actions',
      title: 'GitHub Actions',
      component: GitHubActionsSection,
    },
    {
      id: 'deployment',
      title: 'Deployment Process',
      component: DeploymentProcessSection,
    },
    {
      id: 'authentication',
      title: 'Authentication',
      component: AuthenticationSection,
    },
    {
      id: 'configuration',
      title: 'Tinkering',
      component: AdvancedConfigurationSection,
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      component: TroubleshootingSection,
    },
  ];

  // Add Community Showcase section only when all steps are completed
  const sections =
    getProgressPercentage() === 100
      ? [
          ...baseSections,
          {
            id: 'community',
            title: 'Community Showcase',
            component: () => (
              <CommunityShowcaseSection markWebsiteSubmitted={markWebsiteSubmitted} progress={progress} />
            ),
          },
        ]
      : baseSections;

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component;

  const handleToggleComplete = (sectionId: string) => {
    if (progress.completedSections.includes(sectionId)) {
      markSectionIncomplete(sectionId);
    } else {
      markSectionComplete(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-72 lg:flex-shrink-0">
            <div className="space-y-6">
              {/* Progress Bar */}
              <div>
                <ProgressBar
                  percentage={getProgressPercentage()}
                  completedSections={progress.completedSections.length}
                  totalSections={totalSections}
                />
              </div>

              {/* Navigation Menu */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">Guide Sections</h2>
                    <button
                      onClick={resetProgress}
                      className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                      title="Reset Progress"
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <nav className="p-2">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-between group ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } ${
                        section.id === 'community'
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100'
                          : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {section.id === 'community' && <span className="text-yellow-500">🌟</span>}
                        <span>{section.title}</span>
                      </div>
                      {progress.completedSections.includes(section.id) && (
                        <span className="text-green-500 text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Achievement Badges */}
              <div>
                <AchievementBadges
                  unlockedAchievements={getUnlockedAchievements()}
                  availableAchievements={getAvailableAchievements()}
                  newAchievements={newAchievements}
                  onDismissNewAchievements={dismissNewAchievements}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {sections.find(s => s.id === activeSection)?.title}
                  </h1>
                  {activeSection !== 'community' && (
                    <SectionCompleteButton
                      sectionId={activeSection}
                      isCompleted={progress.completedSections.includes(activeSection)}
                      onToggleComplete={handleToggleComplete}
                    />
                  )}
                </div>

                {ActiveComponent && <ActiveComponent />}

                {/* Section Navigation */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        const currentIndex = sections.findIndex(s => s.id === activeSection);
                        if (currentIndex > 0) {
                          setActiveSection(sections[currentIndex - 1].id);
                        }
                      }}
                      disabled={sections.findIndex(s => s.id === activeSection) === 0}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={() => {
                        const currentIndex = sections.findIndex(s => s.id === activeSection);
                        if (currentIndex < sections.length - 1) {
                          setActiveSection(sections[currentIndex + 1].id);
                        }
                      }}
                      disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <span>Next</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
