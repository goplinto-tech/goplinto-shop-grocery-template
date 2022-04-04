import { useEffect, useState } from 'react';
import Layout from '@components/layout';
import store from '@redux/store';
import { Provider } from 'react-redux';
import Router, { useRouter } from 'next/router'
// import NProgress from 'nprogress'; //nprogress module
// import 'nprogress/nprogress.css'

// Global Styles
import '@styles/globals.css'
import '@styles/globals.scss'

// Components Styles
import '@styles/inputs.scss'
import '@styles/product-item.scss'
import '@styles/navbar.scss'
import '@styles/auth.scss'
import '@styles/pdp-image.scss'
import '@styles/mob-cat.scss'
import '@styles/cat.scss'

// Page Styles
import '@styles/product.scss'
import '@styles/cart.scss'
import '@styles/saved-places.scss'


//Binding events. 
// Router.events.on('routeChangeStart', () => NProgress.start());
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const path = router.asPath;
    // console.log((/#!(\/.*)$/.exec(router.asPath) || []), 'fadfasdfsadfds');
    if (path != '/' && !path.includes('[')) {
      router.replace(path);
      setRedirected(true)
    }
  }, [router.isReady])

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
