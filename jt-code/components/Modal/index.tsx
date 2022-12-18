import React from 'react'

import Image from 'next/image'
import CLOSE_SVG from 'assets/images/Public/svg/close.svg'

type Props = {
  children: any,
  open: boolean,
  onCancel: any
}

const Modal = (props: Props) => {
  const {children, open, onCancel} = props;

  if(!open) return null;
  
  return (
    <section className='bk__modal'>
      <div className='bk__modal--content'>
        <div>{children}</div>
        <Image 
          src={CLOSE_SVG}
          alt='close'
          onClick={() => {onCancel()}}
        />
      </div>
    </section>
  )
}

export default Modal