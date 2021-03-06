import clsx from 'clsx'
import React, { ChangeEvent, useContext, useState } from 'react'
import { useRouter } from 'next/router';
//React-Phone-Input-2
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo'
import { WhiteBlock } from '../../WhiteBlock'
import axios from "../../../core/axios";

import styles from './EnterCodeStep.module.scss';
import { MainContext } from '../../../pages';
export const EnterCodeStep = () => {
  const router = useRouter();
  const [isLoadig, setIsLoadig] = useState<boolean>(false);
  const [codes, setCodes] = useState<Array<number>>([]);
  const nextDisabled = codes.some((v) => !v) || codes.length < 4;
  const { user } = useContext(MainContext);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.getAttribute('id')) - 1;
    const value = Number(e.target.value);

    setCodes((prev) => {
      const newArr = [...prev];
      newArr[id] = value;
      return newArr;
    });

    if (e.target.nextElementSibling) {
      (e.target.nextElementSibling as HTMLElement).focus();
    } else {
      handleOnSubmit([...codes, value].join(''));
    }
  }

  const handleOnSubmit = async (code: string) => {
    try {
      setIsLoadig(true);
      console.log('USER', user);
      await axios.post(`/auth/sms/activate`, { code, user });
      router.push('/rooms');
    } catch (err) {
      alert(err);
      setCodes([]);
      setIsLoadig(false);
    }
  }

  return (
    <div className={styles.block}>
      {
        !isLoadig ?
          <>
            <StepInfo icon="/static/numbers.svg" title="Enter your activation code" />
            <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
              <div className={clsx('mb-30', styles.codeInput)}>
                {[1, 2, 3, 4].map((idx) => (
                  <input
                    autoFocus={idx === 1}
                    type="tel"
                    placeholder="X"
                    maxLength={1}
                    id={idx.toString()}
                    onChange={handleChangeInput}
                    value={codes[idx - 1] || ''}
                    key={idx}
                  />
                ))}
              </div>
              {/* <Button onClick={handleOnSubmit} disabled={nextDisabled} className="m-auto d-flex align-items-c justify-content-c">
                Next
          <img className="d-ib ml-10" src="/static/arrow.svg" alt="Right arrow" />
              </Button> */}
              <p className={clsx(styles.policyText, 'mt-30')}>
                By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!
              </p>
            </WhiteBlock>
          </> :
          <div className="text-center mt-15">
            <div className="loader" />
            <h3 className="mt-10">Activation in progress ...</h3>
          </div>
      }

    </div>
  )
}