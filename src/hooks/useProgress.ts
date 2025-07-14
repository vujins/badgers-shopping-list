import { useCallback, useEffect, useState } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  requirement: {
    type: 'sections_completed' | 'all_sections' | 'specific_sections' | 'website_submitted';
    count?: number;
    sections?: string[];
  };
}

export interface ProgressState {
  completedSections: string[];
  unlockedAchievements: string[];
  lastUpdated: Date;
  websiteSubmitted?: boolean;
}

const STORAGE_KEY = 'azure-web-app-guide-progress';

const getInitialProgress = (): ProgressState => {
  const defaultProgress: ProgressState = {
    completedSections: [],
    unlockedAchievements: [],
    lastUpdated: new Date(),
    websiteSubmitted: false,
  };

  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      return {
        ...parsed,
        lastUpdated: new Date(parsed.lastUpdated),
        websiteSubmitted: parsed.websiteSubmitted || false,
      };
    }
  } catch (error) {
    console.error('Failed to parse saved progress:', error);
  }

  return defaultProgress;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first section',
    icon: '🚀',
    requirement: { type: 'sections_completed', count: 1 },
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Complete Prerequisites and Local Development',
    icon: '💻',
    requirement: { type: 'specific_sections', sections: ['prerequisites', 'local-setup'] },
  },
  {
    id: 'azure-explorer',
    title: 'Azure Explorer',
    description: 'Complete Azure Web App Setup',
    icon: '☁️',
    requirement: { type: 'specific_sections', sections: ['azure-web-app-setup'] },
  },
  {
    id: 'deployment-master',
    title: 'Deployment Master',
    description: 'Complete GitHub Actions and Deployment Process',
    icon: '🔧',
    requirement: { type: 'specific_sections', sections: ['github-actions', 'deployment'] },
  },
  {
    id: 'security-expert',
    title: 'Security Expert',
    description: 'Complete Authentication section',
    icon: '🔐',
    requirement: { type: 'specific_sections', sections: ['authentication'] },
  },
  {
    id: 'troubleshooter',
    title: 'Troubleshooter',
    description: 'Complete Troubleshooting section',
    icon: '🛠️',
    requirement: { type: 'specific_sections', sections: ['troubleshooting'] },
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Complete all sections of the guide',
    icon: '🏆',
    requirement: { type: 'all_sections' },
  },
  {
    id: 'speed-runner',
    title: 'Speed Runner',
    description: 'Complete 5 sections in a row',
    icon: '⚡',
    requirement: { type: 'sections_completed', count: 5 },
  },
  {
    id: 'community-explorer',
    title: 'Community Explorer',
    description: 'Unlock the Community Showcase by completing all sections',
    icon: '🌟',
    requirement: { type: 'all_sections' },
  },
  {
    id: 'community-contributor',
    title: 'Community Contributor',
    description: 'Share your website with the community!',
    icon: '🎉',
    requirement: { type: 'website_submitted' },
  },
];

const ALL_SECTIONS = [
  'overview',
  'prerequisites',
  'local-setup',
  'codebase',
  'azure-web-app-setup',
  'github-actions',
  'deployment',
  'authentication',
  'configuration',
  'troubleshooting',
];

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>(getInitialProgress);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const checkAchievements = useCallback(
    (completedSections: string[], websiteSubmitted: boolean = false, currentUnlockedAchievements: string[] = []) => {
      const newlyUnlocked: Achievement[] = [];

      ACHIEVEMENTS.forEach(achievement => {
        if (currentUnlockedAchievements.includes(achievement.id)) {
          return; // Already unlocked
        }

        let shouldUnlock = false;

        switch (achievement.requirement.type) {
          case 'sections_completed':
            shouldUnlock = completedSections.length >= (achievement.requirement.count || 0);
            break;
          case 'specific_sections':
            shouldUnlock =
              achievement.requirement.sections?.every(section => completedSections.includes(section)) || false;
            break;
          case 'all_sections':
            shouldUnlock = ALL_SECTIONS.every(section => completedSections.includes(section));
            break;
          case 'website_submitted':
            shouldUnlock = websiteSubmitted;
            break;
        }

        if (shouldUnlock) {
          newlyUnlocked.push({ ...achievement, unlockedAt: new Date() });
        }
      });

      return newlyUnlocked;
    },
    []
  );

  const markSectionComplete = useCallback(
    (sectionId: string) => {
      // Get the current state and check for new achievements
      const currentProgress = progress;

      if (currentProgress.completedSections.includes(sectionId)) {
        return; // Already completed
      }

      const newCompletedSections = [...currentProgress.completedSections, sectionId];
      const newlyUnlocked = checkAchievements(
        newCompletedSections,
        currentProgress.websiteSubmitted,
        currentProgress.unlockedAchievements
      );

      // Update the progress state
      setProgress(prev => ({
        ...prev,
        completedSections: newCompletedSections,
        unlockedAchievements: [...prev.unlockedAchievements, ...newlyUnlocked.map(a => a.id)],
        lastUpdated: new Date(),
      }));

      // Set new achievements after the state update
      if (newlyUnlocked.length > 0) {
        setNewAchievements(newlyUnlocked);
      }
    },
    [checkAchievements, progress]
  );

  const markSectionIncomplete = useCallback((sectionId: string) => {
    setProgress(prev => ({
      ...prev,
      completedSections: prev.completedSections.filter(id => id !== sectionId),
      lastUpdated: new Date(),
    }));
  }, []);

  const markWebsiteSubmitted = () => {
    setProgress(prev => {
      if (prev.websiteSubmitted) {
        return prev; // Already submitted
      }

      const newlyUnlocked = checkAchievements(prev.completedSections, true, prev.unlockedAchievements);

      // Set new achievements immediately within the same callback
      if (newlyUnlocked.length > 0) {
        setNewAchievements(newlyUnlocked);
      }

      return {
        ...prev,
        websiteSubmitted: true,
        unlockedAchievements: [...prev.unlockedAchievements, ...newlyUnlocked.map(a => a.id)],
        lastUpdated: new Date(),
      };
    });
  };

  const resetProgress = useCallback(() => {
    setProgress({
      completedSections: [],
      unlockedAchievements: [],
      lastUpdated: new Date(),
      websiteSubmitted: false,
    });
    setNewAchievements([]);
  }, []);

  const dismissNewAchievements = useCallback(() => {
    setNewAchievements([]);
  }, []);

  const getProgressPercentage = useCallback(() => {
    return Math.round((progress.completedSections.length / ALL_SECTIONS.length) * 100);
  }, [progress.completedSections.length]);

  const getUnlockedAchievements = useCallback(() => {
    return ACHIEVEMENTS.filter(achievement => progress.unlockedAchievements.includes(achievement.id));
  }, [progress.unlockedAchievements]);

  const getAvailableAchievements = useCallback(() => {
    return ACHIEVEMENTS.filter(achievement => !progress.unlockedAchievements.includes(achievement.id));
  }, [progress.unlockedAchievements]);

  return {
    progress,
    markSectionComplete,
    markSectionIncomplete,
    markWebsiteSubmitted,
    resetProgress,
    getProgressPercentage,
    getUnlockedAchievements,
    getAvailableAchievements,
    newAchievements,
    dismissNewAchievements,
    totalSections: ALL_SECTIONS.length,
  };
};
