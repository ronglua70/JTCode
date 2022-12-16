import React from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'

type Props = {}

const HomePage = (props: Props) => {
  const router = useRouter();

  const handleGoToContactPage = () => {
    return router.push({pathname: '/contact', query: {name: 'bao'}});
  }

  return (
    <>
      <div className='bk__HomePage'>HomePage</div>

      <ul>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link as={'AboutUs'} href={'/aboutus'}>About us</Link></li>
        <li><Link prefetch={false} href={'/contact'}>Contact</Link></li>
      </ul>

      <button onClick={() => handleGoToContactPage()}>go to page</button>
    </>
  )
}

export default HomePage