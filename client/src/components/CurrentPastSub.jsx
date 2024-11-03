import Box from '@mui/material/Box';

function CurrentPastSub() {
    return (
        <Box component="div" sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            {/* Current Subscription Section */}
            <Box component="div" sx={{ textAlign: 'center', flex: 1 }}>
                <h2>Current Subscription</h2>
                <Box component="section" sx={{ p: 2, border: '1px solid grey', minHeight: '150px' }}>
                    Choose Your Box – Begin by exploring our three unique box options. Each is thoughtfully crafted to bring you joy, discovery, and quality.
                </Box>
            </Box>

            {/* Past Orders Section */}
            <Box component="div" sx={{ textAlign: 'center', flex: 1 }}>
                <h2>Past Orders</h2>
                <Box component="section" sx={{ p: 2, border: '1px solid grey', minHeight: '150px' }}>
                    Choose Your Box – Begin by exploring our three unique box options. Each is thoughtfully crafted to bring you joy, discovery, and quality.
                </Box>
            </Box>
        </Box>
    );
}

export default CurrentPastSub;
