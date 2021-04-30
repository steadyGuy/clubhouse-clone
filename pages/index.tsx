import Head from 'next/head'
import React, { useState } from 'react'
import { ChooseAvatarStep } from '../components/steps/ChooseAvatarStep';
import { EnterCodeStep } from '../components/steps/EnterCodeStep';
import { EnterNameStep } from '../components/steps/EnterNameStep';
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep';
import { SteamStep } from '../components/steps/SteamStep';
import { WelcomeStep } from '../components/steps/WelcomeStep'

const stepsComponents = {
  1: WelcomeStep,
  2: SteamStep,
  3: EnterNameStep,
  4: ChooseAvatarStep,
  5: EnterPhoneStep,
  6: EnterCodeStep,
}

type User = {
  id: string;
  displayName: string;
  avatarUrl: string;
  username: string;
  isActive: number;
  phone: string;
}

type MainContextProps = {
  onNextStep: () => void;
  setUserData: (data: User) => void;
  setFieldValue: (field: keyof User, value: string | number) => void;
  step: number;
  user: User;
}

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export default function Home() {

  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<User>();
  const Step = stepsComponents[step];

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  }

  const setUserData = (user: User) => {
    setUser(user);
  }

  const setFieldValue = (field: string, value: string | number) => {
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  console.log(user);

  return (
    <MainContext.Provider value={{ step, onNextStep, setUserData, user, setFieldValue }}>
      <Head>
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>
      <Step />
    </MainContext.Provider>
  )
}