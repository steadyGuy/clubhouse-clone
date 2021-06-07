import clsx from 'clsx';
import Link from 'next/link';
import React, { FC, useEffect, useRef, useState } from 'react'
import { Button } from '../Button';
import { Speaker, SpeakerProps } from '../Speaker';

import styles from './Room.module.scss';

import socketio, { Socket } from 'socket.io-client';
import { selectUser } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { User } from '../../pages';
import { useSocket } from '../../hooks/useSocket';

interface RoomProps {
  title: string;
}

export const Room: FC<RoomProps> = ({ title }) => {
  const user = useSelector(selectUser);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket()
  const router = useRouter();

  useEffect(() => {
    socket.emit('CLIENT@ROOMS:JOIN', { user, roomId: router.query.slug });

    socket.on('SERVER@ROOMS:JOIN', joinedUsers => {
      setUsers(joinedUsers)
    });

    socket.on('SERVER@ROOMS:LEAVE', leavedUser => {
      console.log('leavedUser', leavedUser)
      console.log('uuuuuser', users);
      setUsers(prev => prev.filter(usr => usr.id !== leavedUser.id))
    });


    return () => {
      socket?.disconnect();
    }
  }, []);


  return (
    <div className={styles.wrapper}>
      <div className="d-flex align-items-c justify-content-between">
        <h2>{title}</h2>
        <div className={clsx('d-flex align-items-c', styles.actionButtons)}>
          <Link href="/rooms">
            <a>
              <Button color="gray" className={styles.leaveButton}>
                <img width={18} height={18} src="/static/peace.png" alt="Hand Black" />
                Leave quietly
              </Button>
            </a>
          </Link>
        </div>
      </div>
      <div className="users">
        {users.map((user, idx) => (
          <Speaker {...user} key={idx} />
        ))}
      </div>
    </div>
  );
}
