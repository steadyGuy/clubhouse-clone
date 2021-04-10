import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import ConversationCard from '../components/ConversationCard'
import { Header } from '../components/Header/Header'

import axios from '../core/axios';

export default function Rooms({ rooms = [] }) {
  return (
    <>
      <Head>
        <title>Clubhouse: Rooms</title>
      </Head>
      <Header />
      <div className="container">
        <div className="mt-30 d-flex align-items-c justify-content-between">
          <h1>All conversations</h1>
          <Button color="green">+ Start room</Button>
        </div>
      </div>
      <div className="container grid mt-20">
        {rooms.map((room) => (
          <Link href={`/rooms/${room.id}`} key={room.id}>
            <a>
              <ConversationCard
                title={room.title}
                avatars={room.avatars}
                guests={room.guests}
                guestsCount={room.guestsCount}
                speakersCount={room.speakersCount}
              />
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data } = await axios.get('/rooms.json');
    return {
      props: {
        rooms: data
      }
    }
  } catch (err) {
    console.error(err);
    return {
      props: {
        rooms: []
      }
    }
  }
}
