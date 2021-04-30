import clsx from 'clsx'
import React, { ChangeEvent, useContext, useState } from 'react'
import { MainContext } from '../../../pages';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo'
import { WhiteBlock } from '../../WhiteBlock'

import styles from './EnterNameStep.module.scss';

export const EnterNameStep = () => {
  const { onNextStep, user, setFieldValue } = useContext(MainContext);
  const [inputValue, setInputValue] = useState(user.displayName);
  const nextDisabled = inputValue.length < 4;

  const handleNextClick = () => {
    setFieldValue('displayName', inputValue);
    onNextStep();
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/man.svg"
        title="What's your full name?"
        description="People use real names on Clubhouse :) Thnx!"
      />
      <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
        <div className="mb-30 text-center">
          <input autoFocus={true} onChange={handleChangeInput} className="field" placeholder="Enter fullname" value={inputValue} />
        </div>
        <Button disabled={nextDisabled} onClick={handleNextClick} className="m-auto d-flex align-items-c justify-content-c">
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" alt="Right arrow" />
        </Button>
      </WhiteBlock>
    </div>
  )
}