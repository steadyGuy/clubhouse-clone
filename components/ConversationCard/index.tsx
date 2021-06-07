import clsx from 'clsx'
import React, { FC } from 'react'

import whiteBlockStyles from '../WhiteBlock/WhiteBlock.module.scss';
import styles from './ConversationCard.module.scss'
import Avatar from '../Avatar';
import { User } from '../../pages';

interface ConversationCardProps {
  title: string;
  speakers: Array<User>;
  listenersCount: number;
}

const ConversationCard: FC<ConversationCardProps> = ({ title, speakers = [], listenersCount }) => {
  return (
    <div className={clsx(whiteBlockStyles.block, styles.card)}>
      <h4 className={styles.title}>{title}</h4>
      <div className={clsx('d-flex mt-10', styles.content)}>
        <div className={styles.avatars}>
          {speakers.map((speaker, i) => (
            <Avatar
              key={speaker.id}
              width="45px"
              height="45px"
              src={speaker.avatarUrl}
              className={i === speakers.length - 1 ? 'lastAvatar' : ''}
            />
          ))}
        </div>
        <div className={clsx(styles.info, 'ml-10')}>
          <ul className={styles.guests}>
            {speakers.map((speaker) => (
              <li key={speaker.id}>
                {speaker.displayName} <img src="/static/cloud.png" alt="Cloud" width={14} height={14} />
              </li>
            ))}
          </ul>
          <ul className={clsx(styles.details, 'mt-5')}>
            <li>
              {listenersCount} <img src="/static/user.svg" alt="User count" width={12} height={12} />
            </li>
            <li className="ml-10">
              {speakers.length} <img
                src="/static/message.svg"
                alt="User count"
                width={12}
                height={12}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ConversationCard
