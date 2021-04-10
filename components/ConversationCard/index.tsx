import clsx from 'clsx'
import React, { FC } from 'react'

import whiteBlockStyles from '../WhiteBlock/WhiteBlock.module.scss';
import styles from './ConversationCard.module.scss'
import Avatar from '../Avatar';

interface ConversationCardProps {
  title: string;
  guests: Array<string>;
  avatars: Array<string>;
  guestsCount: number;
  speakersCount: number;
}

const ConversationCard: FC<ConversationCardProps> = ({ title, guests = [], avatars = [], guestsCount, speakersCount, }) => {
  return (
    <div className={clsx(whiteBlockStyles.block, styles.card)}>
      <h4 className={styles.title}>{title}</h4>
      <div className={clsx('d-flex mt-10', styles.content)}>
        <div className={styles.avatars}>
          {avatars.map((url, i) => (
            <Avatar
              key={url + Math.random().toString()}
              width="45px"
              height="45px"
              src={url}
              className={i === avatars.length - 1 ? 'lastAvatar' : ''}
            />
          ))}
        </div>
        <div className={clsx(styles.info, 'ml-10')}>
          <ul className={styles.guests}>
            {guests.map((name) => (
              <li key={name + Math.random().toString()}>
                {name} <img src="/static/cloud.png" alt="Cloud" width={14} height={14} />
              </li>
            ))}
          </ul>
          <ul className={clsx(styles.details, 'mt-5')}>
            <li>
              {guestsCount} <img src="/static/user.svg" alt="User count" width={12} height={12} />
            </li>
            <li className="ml-10">
              {speakersCount} <img
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
