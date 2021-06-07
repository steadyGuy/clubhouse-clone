import clsx from 'clsx';
import Link from 'next/link';
import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectUser } from '../../redux/selectors';
import Avatar from '../Avatar';

import styles from './Header.module.scss';

export const Header: FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className={styles.header}>
      <div className="container d-flex align-items-c justify-content-between">
        <Link href="/rooms">
          <div className={clsx(styles.headerLogo, 'd-flex align-items-c cup')}>
            <img src="/static/hand-wave.png" alt={user?.displayName} />
            <h4 className="ml-5">Clubhouse</h4>
          </div>
        </Link>
        <Link href="/profile/1">
          <div className="d-flex align-items-c cup">
            <b className="mr-15">{user?.displayName}</b>
            <Avatar
              src={user?.avatarUrl || ""}
              width="50px"
              height="50px"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
