import clsx from 'clsx';
import React, { FC } from 'react';

import styles from './Button.module.scss';

const colors = {
  green: styles.buttonSucess,
  gray: styles.buttonGray,
  blue: styles.buttonBlue,
};

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: keyof typeof colors;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ onClick, className, color, disabled, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(className, styles.button, colors[color])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
