import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_STORE_API_URI,
})

const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem("token")

    return {
        headers: {
            ...headers, 
            Authorization: token ? `JWT ${token}`: "",
        }
    }
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default apolloClient