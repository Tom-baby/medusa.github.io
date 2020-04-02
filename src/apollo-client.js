import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'


const accessToken = '5826d3f4b4a6f1070b6b361ae85ee9c3b11c84dd';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql'
});

const middlewareLink = setContext(() => ({
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}));

const link = middlewareLink.concat(httpLink);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);

export { apolloClient };


