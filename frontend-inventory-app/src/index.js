import React from "react";
import ReactDOM from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";


// appolo client
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, split, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

// const root = ReactDOM.createRoot(document.getElementById("root"));



const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'apollo-require-preflight': 'true',
    },
  };
});


const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_SERVER_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_SUBSCRIPTION_URL,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  uploadLink
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});



// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ApolloProvider client={client}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//       </ApolloProvider>
//     </Provider>
//   </React.StrictMode>
// );

const Main = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ApolloProvider>
      </Provider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

reportWebVitals();

