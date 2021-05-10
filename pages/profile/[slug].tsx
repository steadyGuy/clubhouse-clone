import clsx from 'clsx';
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Avatar from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header/Header';
import { Profile } from '../../components/Profile';

export default function ProfilePage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>Clubhouse: Rooms</title>
      </Head>
      <Header />
      <Profile
        fullname="Yuriy Soproniuk"
        username="niukJs"
        avatarUrl="https://cdn.pixabay.com/photo/2016/01/19/17/19/young-woman-1149643_960_720.jpg"
        about="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, natus. Minus, dolorem! Sint tenetur molestias odit ut necessitatibus, doloribus explicabo."
      />
    </>
  )
}