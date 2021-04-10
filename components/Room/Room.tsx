import clsx from 'clsx';
import Link from 'next/link';
import React, { FC, useState } from 'react'
import Avatar from '../Avatar';
import { Button } from '../Button';

import styles from './Room.module.scss';

interface RoomProps {
  title: string;
}

export const Room: FC<RoomProps> = ({ title }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {

  // }, [input])

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
        {/* {users.map(())} */}
      </div>
    </div>
  );
}
