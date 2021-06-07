import clsx from 'clsx';
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { Api } from '../../api';
import { BackButton } from '../../components/BackButton';
import { Header } from '../../components/Header/Header';
import { Room } from '../../components/Room/Room';
import { enhancedServerSideProps } from '../../utils/enhancedServerSideProps';

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

export const getServerSideProps = enhancedServerSideProps(async (ctx) => {
  try {
    let { slug } = ctx.query;
    if (!slug) {
      slug = '1';
    }
    const room = await Api(ctx).getRoom(+slug as number);
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
});