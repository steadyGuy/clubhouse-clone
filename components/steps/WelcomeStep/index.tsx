import { useContext } from 'react';
import { Button } from '../../Button';
import { WhiteBlock } from '../../WhiteBlock'
import { MainContext } from "../../../pages";;

import styles from './WelcomeStep.module.scss';

export const WelcomeStep = () => {

  const { onNextStep } = useContext(MainContext);

  return (
    <WhiteBlock className={styles.block}>
      <h3 className={styles.title}>
        <img className={styles.handWaveImg} src="/static/hand-wave.png" alt="User Celebration" />
        Clubhouse
      </h3>
      <p>
        Hey, we're still opening up but anyone can join with an invite from an existing user!
      </p>
      <div>
        <Button onClick={onNextStep} className="d-flex align-items-c justify-content-c m-auto">
          Get your username
          <img className="d-ib ml-10" src="/static/arrow.svg" alt="Right arrow" />
        </Button>
      </div>
      <div className="link mt-15 cup d-ib">Have an text? Sign in</div>
    </WhiteBlock>
  )
}
