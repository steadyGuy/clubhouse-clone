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
  const { onNextStep } = useContext(MainContext);
  const [values, setValues] = useState<NumberFormatValues>({} as NumberFormatValues);
  console.log(values);
  const nextDisabled = !values.formattedValue || values.formattedValue.includes('_');

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
            format="+# (###) ###-##-##"
            mask="_"
            placeholder="+7 (999) 333-22-11"
            value={values.value}
            onValueChange={values => setValues(values)}
          />
        </div>
        <Button onClick={onNextStep} disabled={nextDisabled} className="m-auto d-flex align-items-c justify-content-c">
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" alt="Right arrow" />
        </Button>
        <p className={clsx(styles.policyText, 'mt-30')}>
          By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!
        </p>
      </WhiteBlock>
    </div>
  )
}