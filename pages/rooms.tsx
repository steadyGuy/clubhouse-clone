import Head from 'next/head'
import React, { useState } from 'react'
import { Header } from '../components/Header/Header'

export default function Rooms() {
  return (
    <>
      <Header />
      <Head>
        <title>Clubhouse: Rooms</title>
      </Head>
      <h1>Rooms over here!</h1>
    </>
  )
}
