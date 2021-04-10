import clsx from 'clsx'
import React, { FC } from 'react'

import styles from './Avatar.module.scss'

interface AvatarProps {
  src: string;
  width: string;
  height: string;
  className?: string;
  isVoice?: boolean;
}

const Avatar: FC<AvatarProps> = ({ src, width, height, className, isVoice }) => {
  return (
    <div
      style={{ width, height, backgroundImage: `url(${src})`, backgroundSize: 'cover' }}
      className={clsx(styles.avatar, isVoice ? styles.avatarBorder : '')}
    >
    </div>
  )
}

export default Avatar
