import clsx from 'clsx';
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { Api } from '../../api';
import { BackButton } from '../../components/BackButton';
import { Header } from '../../components/Header/Header';
import { Room } from '../../components/Room/Room';
import axios from '../../core/axios';

export default function RoomPage({ room }) {
  console.log('room', room)
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
    const { slug } = ctx.query;
    const room = await Api(ctx).getRoom(slug);
    return {
      props: {
        room,
      }
    }
  } catch (err) {
    console.log(err);
    return {
      props: {},
      redirect: {
        destination: '/rooms',
        permanent: false,
      }
    }
  }
}