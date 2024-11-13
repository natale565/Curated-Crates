import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_ORDER_STATUS } from '../utils/mutations';

function Dash() {
  const { data, loading, error } = useQuery(QUERY_USER);
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS); 

  const user = data?.user;

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading user data.</Typography>;

  const handleStatusChange = async (orderId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  
    try {
      await updateOrderStatus({
        variables: {
          id: orderId,
          status: newStatus
        },
        update: (cache, { data: { updateOrderStatus } }) => {
          const existingData = cache.readQuery({ query: QUERY_USER });
  
          const updatedOrders = existingData.user.orders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          );
  
          cache.writeQuery({
            query: QUERY_USER,
            data: { user: { ...existingData.user, orders: updatedOrders } },
          });
        },
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container my-1">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          sx={{
            fontFamily: 'Quicksand',
            backgroundColor: '#333',
            color: 'white',
            '&:hover': {
              backgroundColor: '#555',
            },
            padding: '8px 16px',
            fontSize: '0.875rem',
            marginTop: '75px',
            marginBottom: '16px',
          }}
        >
          ← Back to Subscription Boxes
        </Button>
      </Link>

      {user ? (
        <>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: 'Quicksand',
                fontSize: '2.4rem',
                fontWeight: 'bold',
                background:
                  'linear-gradient(90deg, #ffffff, #FFBC00, #ff8800, #FFBC00, #ffffff)',
                backgroundSize: '300% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animation: 'glimmer-horizontal 6s linear infinite',
              }}
              gutterBottom
            >
              Your Order History
            </Typography>
            <style>
              {`
                @keyframes glimmer-horizontal {
                    0% {
                        background-position: -200%;
                    }
                    100% {
                        background-position: 200%;
                    }
                }
              `}
            </style>
          </Box>

          {user.orders?.length > 0 ? (
            <Box sx={{alignItems: 'center' }}>
              {user.orders.map((order) => (
                <Box
                  key={order._id}
                  sx={{
                    mx: 4,
                    mb: 6,
                    borderRadius: '10px',
                    boxShadow: 3,
                    border: '1px solid',
                    borderColor: 'white',
                    overflow: 'hidden',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: order.orderStatus === 'active' ? 'green' : 'red',
                      mb: 2,
                      mt: 2,
                    }}
                  >
                    Status: {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {order.subscriptionBoxes?.map(({ _id, image, name, price, description, shippingFrequency }, index) => (
                      <Box
                        key={_id || index}
                        sx={{
                          mx: 2,
                          mb: 3,
                          width: '75%',
                          borderRadius: '10px',
                          boxShadow: 3,
                          overflow: 'hidden',
                          textAlign: 'center',
                        }}
                      >
                        <img
                          alt={name}
                          src={`/images/${image}`}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                          }}
                        />
                        <Box sx={{ p: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {name}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            {description}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            ${price}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            Shipping Frequency: {shippingFrequency.charAt(0).toUpperCase() + shippingFrequency.slice(1)}
                          </Typography>
                          <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Button
                              variant="contained"
                              onClick={() => handleStatusChange(order._id, order.orderStatus)}
                              sx={{
                                backgroundColor: order.orderStatus === 'active' ? 'red' : 'green',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: order.orderStatus === 'active' ? 'darkred' : 'darkgreen',
                                },
                              }}
                            >
                              {order.orderStatus === 'active'
                                ? 'Deactivate Subscription'
                                : 'Activate Subscription'}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
              No orders found.
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
          No user data available.
        </Typography>
      )}
    </div>
  );
}

export default Dash;
