import { useState } from 'react';
import {
  AdvancedConfigurationSection,
  APIConfigurationSection,
  AzureSWASetupSection,
  CodebaseStructureSection,
  DeploymentProcessSection,
  GitHubActionsSection,
  LocalDevelopmentSection,
  OverviewSection,
  PrerequisitesSection,
  TroubleshootingSection,
} from './tutorial-steps';

interface TutorialSection {
  id: string;
  title: string;
  component: React.ComponentType;
}

export const Tutorial = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections: TutorialSection[] = [
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
      id: 'codebase',
      title: 'Codebase Structure',
      component: CodebaseStructureSection,
    },
    {
      id: 'local-setup',
      title: 'Local Development',
      component: LocalDevelopmentSection,
    },
    {
      id: 'swa-setup',
      title: 'Azure Web App Setup',
      component: AzureSWASetupSection,
    },
    {
      id: 'github-actions',
      title: 'GitHub Actions',
      component: GitHubActionsSection,
    },
    {
      id: 'api-configuration',
      title: 'API Configuration',
      component: APIConfigurationSection,
    },
    {
      id: 'deployment',
      title: 'Deployment Process',
      component: DeploymentProcessSection,
    },
    {
      id: 'configuration',
      title: 'Advanced Configuration',
      component: AdvancedConfigurationSection,
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      component: TroubleshootingSection,
    },
  ];

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Tutorial Sections</h2>
              </div>
              <nav className="p-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-8">{ActiveComponent && <ActiveComponent />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
