import clsx from 'clsx'
import React, { FC, useState } from 'react'
import { Room, RoomType } from '../../api/RoomApi';
import { Button } from '../Button'

import styles from './StartRoomModal.module.scss'
import { useRouter } from 'next/router';
import { fetchCreateRoom } from '../../redux/slices/roomsSlice';
import { useAsyncAction } from '../../hooks/useAction';

interface StartRoomModalProps {
  onClose: any;
}

export const StartRoomModal: FC<StartRoomModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [form, setForm] = useState<{ title: string; type: RoomType }>({ title: '', type: 'open' })
  const createRoom = useAsyncAction(fetchCreateRoom);

  const onSubmit = async () => {
    if (!form.title) {
      return alert('Укажите заголовок комнаты!');
    }
    const room: Room = await createRoom(form);
    onClose();
    router.push(`/rooms/${room.id}`);
  }

  const onChangeField = (name: string, value: string) => {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          width="24px"
          height="24px"
          src="/static/close.svg"
          alt="Close"
          className={styles.closeBtn}
          onClick={onClose}
        />
        <div className="mb-30">
          <h3>Topic</h3>
          <input
            value={form.title}
            onChange={(e) => onChangeField('title', e.target.value)}
            className={styles.inputTitle}
            placeholder="Enter the topic to be discussed"
          />
        </div>
        <div className="mb-30">
          <h3>Room type</h3>
          <div className="d-flex justify-content-between">
            <div
              onClick={() => onChangeField('type', 'open')}
              className={clsx(styles.roomType, { [styles.roomTypeActive]: form.type === 'open' })}>
              <img width="70px" height="70px" src="/static/room-type-1.png" alt="Room type" />
              <h5>Open</h5>
            </div>
            <div
              onClick={() => onChangeField('type', 'social')}
              className={clsx(styles.roomType, { [styles.roomTypeActive]: form.type === 'social' })}>
              <img width="70px" height="70px" src="/static/room-type-2.png" alt="Room type" />
              <h5>Social</h5>
            </div>
            <div
              onClick={() => onChangeField('type', 'closed')}
              className={clsx(styles.roomType, { [styles.roomTypeActive]: form.type === 'closed' })}>
              <img width="70px" height="70px" src="/static/room-type-3.png" alt="Room type" />
              <h5>Closed</h5>
            </div>
          </div>
        </div>
        <div className={styles.delimiter} />
        <div className="text-center">
          <h3>Start a room open to everyone</h3>
          <Button onClick={onSubmit} color="green">
            <img width="18px" height="18px" src="/static/celebration.svg" alt="Celebration" />
            Let's go
          </Button>
        </div>
      </div>
    </div>
  );
};
