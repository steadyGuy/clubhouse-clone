import clsx from 'clsx'
import React, { FC } from 'react'
import Link from "next/link";
import Avatar from '../Avatar'
import { Button } from '../Button'

import styles from './Profile.module.scss'

interface ProfileProps {
  fullname: string;
  username: string;
  avatarUrl: string;
  about: string;
}

export const Profile: FC<ProfileProps> = ({ fullname, username, avatarUrl, about }) => {
  return (
    <div className="container mt-25">
      <Link href="/rooms">
        <div className={clsx('d-flex align-items-c cup mb-20', styles.topLine)}>
          <img src="/static/left-arrow.svg" alt="Back arrow" className="mr-10" />
          <h3>Back</h3>
        </div>
      </Link>
      <div className="d-flex align-items-c">
        <Avatar
          src={avatarUrl}
          width="100px"
          height="100px"
        />
        <div className="d-flex flex-column ml-30 mr-30">
          <h2 className="mt-0 mb-0">{fullname}</h2>
          <h3 className={clsx(styles.username, "mt-0 mb-0")}>@{username}</h3>
        </div>
        <Button className={styles.followBtn} color="blue">Follow</Button>
      </div>
      <p className={styles.about}>{about}</p>
    </div>
  )
}
