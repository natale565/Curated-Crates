import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { StoreProvider } from './utils/GlobalState';
import Auth from './utils/auth';
import { Box } from '@mui/material';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Auth.getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    Auth.logout();
    setIsAuthenticated(false);
  };

  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', 
          }}
        >
          <Navbar 
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
          <Box sx={{ flexGrow: 1, paddingBottom: '8vh' }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
