import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Api } from '../api'
import { Button } from '../components/Button'
import ConversationCard from '../components/ConversationCard'
import { Header } from '../components/Header/Header'
import { StartRoomModal } from '../components/StartRoomModal'


import { setRooms, setRoomSpeakers } from '../redux/slices/roomsSlice'
import { selectRooms } from '../redux/selectors'
import { enhancedServerSideProps } from '../utils/enhancedServerSideProps'
import { useSocket } from '../hooks/useSocket'

export default function Rooms() {
  const [visibleModal, setVisibleModal] = useState(false);
  const rooms = useSelector(selectRooms);
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleSetModalVisibility = () => {
    setVisibleModal(!visibleModal);
  }

  useEffect(() => {

    socket.on('SERVER@ROOMS:HOME', ({ speakers, roomId }) => {
      console.log(roomId, 'КОМНАТААА', speakers)
      dispatch(setRoomSpeakers({ speakers, roomId }));
    });

  }, [])

  return (
    <>
      <Head>
        <title>Clubhouse: Rooms</title>
      </Head>
      <Header />
      <div className="container">
        <div className="mt-30 d-flex align-items-c justify-content-between">
          <h1>All conversations</h1>
          <Button onClick={handleSetModalVisibility} color="green">+ Start room</Button>
        </div>
      </div>
      {visibleModal && <StartRoomModal onClose={handleSetModalVisibility} />}
      <div className="container grid mt-20">
        {rooms.map((room) => (
          <Link href={`/rooms/${room.id}`} key={room.id}>
            <a>
              <ConversationCard
                title={room.title}
                listenersCount={room.listenersCount}
                speakers={room.speakers}
              />
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = enhancedServerSideProps(async (ctx) => {
  try {
    const rooms = await Api(ctx).getAllRooms();
    // const { data } = await axios.get('/rooms.json');
    ctx.store.dispatch(setRooms(rooms));
    return {
      props: {}
    }
  } catch (err) {
    // console.error(err);
    return {
      props: {
        rooms: [],
      }
    }
  }
});

