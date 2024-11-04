import  ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import NoMatch from './pages/NoMatch.jsx';
import Detail from './pages/Detail.jsx';
import Success from './pages/Success.jsx';
import Dash from './pages/Dash.jsx';
import HowItWorks from './pages/HowItWorksPage.jsx';
import Cart from './components/Cart/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <HomePage />
      }, {
        path: 'signin',
        element: <SignIn />
      }, {
        path: 'signup',
        element: <SignUp />
      }, {
        path: 'success',
        element: <Success />
      }, {
        path: 'dash',
        element: <Dash />
      }, {
        path: 'howitworks',
        element: <HowItWorks />
      }, {
        path: 'cart',
        element:<Cart />
      },
      {
        path: '/products/:id',
        element: <Detail />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)