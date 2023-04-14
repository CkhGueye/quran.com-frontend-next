import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';

import CurrentWeekProgress from '../HomePage/ReadingStreak/CurrentWeekProgress';

import styles from './ReadingProgressPage.module.scss';

import Skeleton from '@/dls/Skeleton/Skeleton';
import { StreakWithMetadata } from '@/hooks/auth/useGetStreakWithMetadata';
import { toLocalizedNumber } from '@/utils/locale';

interface ProgressPageStreakWidgetProps {
  weekData: StreakWithMetadata['weekData'];
  readingGoal?: StreakWithMetadata['readingGoal'];
  streak: number;
  isLoading: boolean;
}

const ProgressPageStreakWidget = ({
  weekData,
  readingGoal,
  streak,
  isLoading,
}: ProgressPageStreakWidgetProps) => {
  const { t, lang } = useTranslation('reading-progress');
  const localizedStreak = toLocalizedNumber(streak, lang);

  const widget = (
    <>
      <div className={styles.streakContainer}>
        <h2>{t('reading-progress-streak')}</h2>
        <p>{t('reading-goal:x-days', { days: localizedStreak, count: streak })}</p>
      </div>

      <CurrentWeekProgress
        weekData={weekData}
        readingGoal={readingGoal}
        shouldHideOnTablet={false}
        fixedWidth={false}
      />
    </>
  );

  const Wrapper = isLoading ? Skeleton : 'div';
  return <Wrapper className={classNames(styles.widget, styles.streakWidget)}>{widget}</Wrapper>;
};

export default ProgressPageStreakWidget;
