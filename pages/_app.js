import { usePanelbear } from '@panelbear/panelbear-nextjs';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {
    debug: process.env.NODE_ENV === 'development',
  });

  return <Component {...pageProps} />
}

export default MyApp
