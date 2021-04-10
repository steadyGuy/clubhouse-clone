import clsx from 'clsx';
import React, { FC } from 'react';

import styles from './StepInfo.module.scss';

interface StepInfoProps {
  title: string;
  description?: string;
  icon: string;
}

export const StepInfo: FC<StepInfoProps> = ({ title, description, icon }) => {
  return (
    <div className={clsx(styles.block, 'text-center')}>
      <div>
        <img className={clsx(styles.img, styles.handWaveImg)} src={icon} alt="Step picture" />
      </div>
      <b className={styles.title}>{title}</b>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
