import axios from '../../../core/axios';
import clsx from 'clsx'
import React, { useContext, useState } from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { MainContext } from '../../../pages';
//React-Phone-Input-2
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo'
import { WhiteBlock } from '../../WhiteBlock'

import styles from './EnterPhoneStep.module.scss';
export const EnterPhoneStep = () => {
  const { onNextStep, setFieldValue } = useContext(MainContext);
  const [values, setValues] = useState<NumberFormatValues>({} as NumberFormatValues);
  const [isLoading, setIsLoading] = useState(false)
  const nextDisabled = !values.formattedValue || values.formattedValue.includes('_');
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setFieldValue('phone', values.value);
      //локалсторидж тут надо
      await axios.get(`/auth/sms?phone=${values.value}`);
      onNextStep();
    } catch (err) {
      console.warn('Ошибка при отправке СМС', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/telephone.svg"
        title="Enter your phone #"
        description="We will send you a confirmation code"
      />
      <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
        <div className={clsx('mb-30', styles.input)}>
          <img src="/static/rus-flag.png" alt="flag" width={24} />
          <NumberFormat
            className="field"
            format="+### (##) ###-##-##"
            mask="_"
            placeholder="+380 (99) 333-22-11"
            value={values.value}
            onValueChange={values => setValues(values)}
          />
        </div>
        <Button onClick={onSubmit} disabled={isLoading || nextDisabled} className="m-auto d-flex align-items-c justify-content-c">
          {isLoading ? 'Sending...' : <>
            Next
          <img className="d-ib ml-10" src="/static/arrow.svg" alt="Right arrow" />
          </>}
        </Button>
        <p className={clsx(styles.policyText, 'mt-30')}>
          By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!
        </p>
      </WhiteBlock>
    </div>
  )
}