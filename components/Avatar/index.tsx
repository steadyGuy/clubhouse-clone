import clsx from 'clsx'
import React, { FC } from 'react'

import styles from './Avatar.module.scss'

interface AvatarProps {
  src: string;
  width: string;
  height: string;
  className?: string;
  isVoice?: boolean;
  letters?: Array<string>;
}

const Avatar: FC<AvatarProps> = ({ src, width, height, className, isVoice, letters }) => {

  return (
    <div
      style={{ width, height, backgroundImage: src ? `url(${src})` : '', backgroundSize: 'cover' }}
      className={clsx(styles.avatar, className, isVoice ? styles.avatarBorder : '', {
        [styles.emptyAvatar]: !src
      })}
    >
      {!src ? letters : null}
    </div>
  )
}

export default Avatar
