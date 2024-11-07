import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER} from '../utils/queries';

function Dash() {
    const { data, loading, error } = useQuery(QUERY_USER);
    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading dashboard: {error.message}</Typography>;
    const user = data?.user;

    return (
        <>
            <div className="container my-1">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="contained" 
                        sx={{
                            backgroundColor: '#333',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#555',
                            },
                            padding: '8px 16px',
                            fontSize: '0.875rem',
                            marginTop: '16px', 
                            marginBottom: '16px',
                        }}
                    >
                        ← Back to Subscription Boxes
                    </Button>
                </Link>
                <Typography variant="h4" component="h1" align="center" sx={{ mb: 4 }}>
                    Welcome to Your Dashboard {user?.name}
                </Typography>

                <Box component="div" sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                    {/* Current Subscription Section */}
                    <Box component="div" sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                            Subscription History
                        </Typography>
                        <Box component="section" sx={{ p: 2, border: '1px solid grey', minHeight: '150px' }}>
                            <Typography variant="body1">
                                {user?.orders?.length > 0 ? (
                                    `You are subscribed to the ${user.orders[0]?.subscriptionBoxes?.name} box.`
                                ) : (
                                    "No orders yet!"
                                )}
                            </Typography>
                        </Box>
                    </Box>                    
                </Box>
            </div>
        </>
    );
}

export default Dash;
