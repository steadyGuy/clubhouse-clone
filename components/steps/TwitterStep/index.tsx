import clsx from 'clsx'
import React, { useContext } from 'react'
import { MainContext } from '../../../pages';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo'
import { WhiteBlock } from '../../WhiteBlock'

import styles from './TwitterStep.module.scss';

export const TwitterStep = () => {
  const { onNextStep } = useContext(MainContext);
  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/plug.svg"
        title="Do you want import info from Twitter?"
      />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={styles.avatar}>
          <b>YS</b>
        </div>
        <h2 className="mb-40">Yuriy Soproniuk</h2>
        <Button onClick={onNextStep} className="m-auto d-flex align-items-c justify-content-c">
          <img className="d-ib ml-10" src="/static/twitter.svg" alt="Twitter icon" />
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" alt="Right arrow" />
        </Button>
      </WhiteBlock>
    </div>
  )
}