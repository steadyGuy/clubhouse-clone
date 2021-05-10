import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Api } from '../api'
import { Room, RoomType } from '../api/RoomApi'
import { Button } from '../components/Button'
import ConversationCard from '../components/ConversationCard'
import { Header } from '../components/Header/Header'
import { StartRoomModal } from '../components/StartRoomModal'

import axios from '../core/axios';
import { checkAuth } from '../utils/checkAuth'

interface RoomPageProps {
  rooms: Room[];
}

export default function Rooms({ rooms = [] }) {
  const [visibleModal, setVisibleModal] = useState(false);

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

export const getServerSideProps: GetServerSideProps<RoomPageProps> = async (ctx) => {
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
    return {
      props: {
        rooms,
        user
      }
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
}
