import Box from '@mui/material/Box';

function Steps() {
    return (
        <>
            <Box component="div" sx={{ display: 'flex', gap: 2 }}>
                <Box component="div" sx={{ flex: 1, minHeight: '150px' }}>
                    <h2 style={{ textAlign: 'center' }}>Step 1</h2>
                    <Box component="section" sx={{ p: 2, border: '1px solid grey', height: '100%' }}>
                        Choose Your Box – Begin by exploring our three unique box options. Each is thoughtfully crafted to bring you joy, discovery, and quality.
                    </Box>
                </Box>

                <Box component="div" sx={{ flex: 1, minHeight: '150px' }}>
                    <h2 style={{ textAlign: 'center' }}>Step 2</h2>
                    <Box component="section" sx={{ p: 2, border: '1px solid grey', height: '100%' }}>
                       Pick Your Tier – Select a tier that matches your desired experience. Higher tiers offer an even greater assortment of premium items, tailored to enhance each delivery.
                    </Box>
                </Box>

                <Box component="div" sx={{ flex: 1, minHeight: '150px' }}>
                    <h2 style={{ textAlign: 'center' }}>Step 3</h2>
                    <Box component="section" sx={{ p: 2, border: '1px solid grey', height: '100%' }}>
                        Get Your Crate – Sit back and relax! Your curated crate will arrive right at your doorstep, ready to surprise and delight you.
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Steps;
