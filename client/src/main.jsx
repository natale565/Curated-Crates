import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css'
import App from './App.jsx'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client = {client}>
    <App />
    </ApolloProvider>
  </StrictMode>,
)
