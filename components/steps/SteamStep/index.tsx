import clsx from 'clsx'
import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../../pages';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo'
import { WhiteBlock } from '../../WhiteBlock'

import styles from './SteamStep.module.scss';

export const SteamStep = () => {
  const { onNextStep, setUserData } = useContext(MainContext);

  const handleOpenIDAuth = () => {
    window.open('http://localhost:3001/auth/steam', 'Auth via OpenID', 'width=500,height=500,menubar=no,location=no,resizable=no,scrollbars=no,status=no,');
  }

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:3001' && event.data.avatarUrl) {
        setUserData(event.data)
        onNextStep();

        Cookies.set('token', event.data.token);
      }
    })

  }, []);

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/plug.svg"
        title="Do you want import info from Twitter?"
      />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={styles.avatar}>
          <b>YS</b>
          <img src="/static/peace.svg" />
        </div>
        <h2 className="mb-40">Yuriy Soproniuk</h2>
        <Button onClick={handleOpenIDAuth} className={clsx(styles.button, "m-auto d-flex align-items-c justify-content-c")}>
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" alt="Right arrow" />
        </Button>
      </WhiteBlock>
    </div>
  )
}