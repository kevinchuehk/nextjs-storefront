import '../styles/globals.css'
import Layout from '../components/layout'
import { ApolloProvider } from '@apollo/client'
import { CartProvider } from "react-use-cart";
import apolloClient from '../lib/apollo'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
    </CartProvider>
  )
}

export default MyApp
