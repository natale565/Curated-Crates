// In src/pages/Success.jsx

import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries'; 
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER, {
    refetchQueries: [{ query: QUERY_USER }],
  });

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const subscriptionBoxes = cart.map((item) => item._id);
  
      if (subscriptionBoxes.length) {
        const { data } = await addOrder({
          variables: { subscriptionBoxes },
          refetchQueries: [{ query: QUERY_USER }],
        });
          
        const subscriptionBoxData = data.addOrder.subscriptionBoxes;
  
        subscriptionBoxData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
  
      setTimeout(() => {
        window.location.assign('/');
      }, 1000);
    }
  
    saveOrder();
  }, [addOrder]);
  

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
