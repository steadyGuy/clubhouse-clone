import clsx from 'clsx'
import React, { FC } from 'react'
import Link from "next/link";

type BackButtonProps = {
  title: string;
  href: string;
}

export const BackButton: FC<BackButtonProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <a>
        <div className={clsx('d-flex align-items-c cup mb-20')}>
          <img src="/static/left-arrow.svg" alt="Back arrow" className="mr-10" width={20} height={20} />
          <h3>{title}</h3>
        </div >
      </a>
    </Link>
  )
}
