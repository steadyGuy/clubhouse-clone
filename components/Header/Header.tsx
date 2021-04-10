import clsx from 'clsx';
import Link from 'next/link';
import React, { FC } from 'react'
import Avatar from '../Avatar';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className="container d-flex align-items-c justify-content-between">
        <Link href="/rooms">
          <div className={clsx(styles.headerLogo, 'd-flex align-items-c cup')}>
            <img src="/static/hand-wave.png" alt="Logo" />
            <h4 className="ml-5">Clubhouse</h4>
          </div>
        </Link>
        <Link href="/profile/1">
          <div className="d-flex align-items-c cup">
            <b className="mr-15">Yuriy Soproniuk</b>
            <Avatar
              src="https://cdn.pixabay.com/photo/2016/01/19/17/19/young-woman-1149643_960_720.jpg"
              width="50px"
              height="50px"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
