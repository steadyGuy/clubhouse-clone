import clsx from 'clsx';
import styles from './WhiteBlock.module.scss';

export const WhiteBlock = ({ className, children }) => {
  return <div className={clsx(styles.block, className)}>{children}</div>
}