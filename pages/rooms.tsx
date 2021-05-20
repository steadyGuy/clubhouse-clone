import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Api } from '../api'
import { Room, RoomType } from '../api/RoomApi'
import { Button } from '../components/Button'
import ConversationCard from '../components/ConversationCard'
import { Header } from '../components/Header/Header'
import { StartRoomModal } from '../components/StartRoomModal'

import axios from '../core/axios';
import { setRooms } from '../redux/slices/roomsSlice'
import { selectRooms } from '../redux/slices/selectors'
import { wrapper } from '../redux/store'
import { checkAuth } from '../utils/checkAuth'

export default function Rooms() {
  const [visibleModal, setVisibleModal] = useState(false);
  const rooms = useSelector(selectRooms);


  const handleSetModalVisibility = () => {
    setVisibleModal(!visibleModal);
  }

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
                avatars={room.avatars}
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const user = await checkAuth(ctx);
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  try {
    const rooms = await Api(ctx).getAllRooms();
    // const { data } = await axios.get('/rooms.json');
    ctx.store.dispatch(setRooms(rooms))
    return {
      props: {}
    }
  } catch (err) {
    // console.error(err);
    return {
      props: {
        rooms: [],
        user,
      }
    }
  }
});