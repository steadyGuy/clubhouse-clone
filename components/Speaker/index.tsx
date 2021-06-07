import React, { FC } from 'react';
import Avatar from '../Avatar';

import styles from './Speaker.module.scss';

export type SpeakerProps = {
  id: string;
  displayName: string;
  avatarUrl: string;
}

export const Speaker: FC<SpeakerProps> = ({ displayName, avatarUrl }) => {
  return (
    <div className="d-i-flex flex-column align-items-c mr-40 mb-40">
      <Avatar src={avatarUrl} height="100px" width="100px" />
      <div className="mt-5">
        <b>{displayName}</b>
      </div>
    </div>
  );
};