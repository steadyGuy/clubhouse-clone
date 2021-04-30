import axios from '../../../core/axios';
import clsx from 'clsx'
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../../pages';
import Avatar from '../../Avatar';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo'
import { WhiteBlock } from '../../WhiteBlock'

import styles from './ChooseAvatarStep.module.scss';

type Avatar = {
  url: string;
  blob?: Blob;
}

const uploadFile = async (imageBlob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append('avatar', imageBlob)
  const { data } = await axios.post('/upload', formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  return data.url;
}

export const ChooseAvatarStep: FC = () => {
  const { onNextStep, setFieldValue, user } = useContext(MainContext);
  const [avatar, setAvatar] = useState<Avatar>({ url: 'https://cdn.pixabay.com/photo/2016/01/19/17/19/young-woman-1149643_960_720.jpg' });
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleChangeImage = (e: Event) => {
    const file = (e.target as HTMLInputElement).files[0];
    if (file) {
      const imageBlobUrl = URL.createObjectURL(file);
      setAvatar({ url: imageBlobUrl, blob: file });
    }
  };

  const handleNextStep = async () => {
    const url = await uploadFile(avatar.blob);
    setFieldValue('avatarUrl', url);
    URL.revokeObjectURL(avatar.url);
    inputFileRef.current.removeEventListener('change', handleChangeImage);
    onNextStep();
  }

  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/celebration.svg"
        title={`Okay, ${user && user.displayName}`}
        description="How's this photo?"
      />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={clsx(styles.avatar, "d-flex justify-content-c mb-15")}>
          <Avatar
            width="120px"
            height="120px"
            src={avatar.url}
          />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button onClick={handleNextStep} className="m-auto d-flex align-items-c justify-content-c">
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" alt="Right arrow" />
        </Button>
      </WhiteBlock>
    </div >
  )
}