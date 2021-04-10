import clsx from 'clsx';
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { BackButton } from '../../components/BackButton';
import { Header } from '../../components/Header/Header';
import { Room } from '../../components/Room/Room';
import axios from '../../core/axios';

export default function RoomPage({ room }) {
  return (
    <>
      <Head>
        <title>Clubhouse: Rooms</title>
      </Head>
      <Header />
      <div className="container">
        <BackButton title="All rooms" href="/rooms" />
      </div>
      <Room title={room.title} />
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  try {
    const { data } = await axios.get('/rooms.json');
    const room = data.find(room => room.id === ctx.query.slug)
    return {
      props: {
        room,
      }
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        room: {}
      }
    }
  }
}