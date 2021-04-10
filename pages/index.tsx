import Head from 'next/head'
import React, { useState } from 'react'
import { ChooseAvatarStep } from '../components/steps/ChooseAvatarStep';
import { EnterCodeStep } from '../components/steps/EnterCodeStep';
import { EnterNameStep } from '../components/steps/EnterNameStep';
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep';
import { TwitterStep } from '../components/steps/TwitterStep';
import { WelcomeStep } from '../components/steps/WelcomeStep'

const stepsComponents = {
  1: WelcomeStep,
  2: EnterNameStep,
  3: TwitterStep,
  4: ChooseAvatarStep,
  5: EnterPhoneStep,
  6: EnterCodeStep,
}

type MainContextProps = {
  onNextStep: () => void;
  step: number;
}

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export default function Home() {

  const [step, setStep] = useState<number>(1);
  const Step = stepsComponents[step];

  console.log('MainContext', MainContext)

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  }

  return (
    <MainContext.Provider value={{ step, onNextStep }}>
      <Head>
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>
      <Step />
    </MainContext.Provider>
  )
}