import Box from '@mui/material/Box';

function CurrentSub() {
    return (
        <>
            <h2>Current Subscription</h2>
            <Box component="div" sx={{ display: 'flex', gap: 2 }}>
                <Box component="div" sx={{ flex: 1, minHeight: '150px' }}>
                    <h2 style={{ textAlign: 'center' }}>Step 1</h2>
                    <Box component="section" sx={{ p: 2, border: '1px solid grey', height: '100%' }}>
                        Choose Your Box – Begin by exploring our three unique box options. Each is thoughtfully crafted to bring you joy, discovery, and quality.
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default CurrentSub;