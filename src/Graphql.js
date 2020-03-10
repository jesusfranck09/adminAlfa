import { ApolloClient } from 'apollo-client'; //Client graphql de apollo
import { setContext } from 'apollo-link-context'; //Setea headers de los request
import { InMemoryCache } from 'apollo-cache-inmemory'; //Cache Graphql
import { createUploadLink } from 'apollo-upload-client';

 const API_URL = 'https://git.heroku.com/backenddiagnostico035.git'; //URL

 const httpLink = createUploadLink({
    uri: `${API_URL}/graphql`
})

 const authLink = setContext((_,{headers})=>{
    const token = localStorage.getItem('elToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : ''
        }
    }
});

 export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});