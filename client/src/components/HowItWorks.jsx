import Box from '@mui/material/Box';

function Steps() {
    // Shared styles
    const stepBoxStyles = {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid grey',
        p: 2,
        minWidth: '300px',
    };

    const numberBoxStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pr: 2,
        mr: 2,
        borderRight: '1px solid grey',
    };

    const textBoxStyles = {
        pl: 2,
        textAlign: 'left',
    };

    return (
        <>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 3 }}>
                <h2>Enjoy Carefully Selected Items That Fit Your Interests! Here&apos;s How It Works:</h2>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
                {/* Step 1 */}
                <Box sx={stepBoxStyles}>
                    <Box sx={numberBoxStyles}>
                        <h3 style={{ margin: 0 }}>Step</h3>
                        <h1 style={{ margin: 0 }}>1</h1>
                    </Box>
                    <Box sx={textBoxStyles}>
                        Choose Your Box – Begin by exploring our three unique box options. Each is thoughtfully crafted to bring you joy, discovery, and quality.
                    </Box>
                </Box>

                {/* Step 2 */}
                <Box sx={stepBoxStyles}>
                    <Box sx={numberBoxStyles}>
                        <h3 style={{ margin: 0 }}>Step</h3>
                        <h1 style={{ margin: 0 }}>2</h1>
                    </Box>
                    <Box sx={textBoxStyles}>
                        Pick Your Tier – Select a tier that matches your desired experience. Higher tiers offer an even greater assortment of premium items, tailored to enhance each delivery.
                    </Box>
                </Box>

                {/* Step 3 */}
                <Box sx={stepBoxStyles}>
                    <Box sx={numberBoxStyles}>
                        <h3 style={{ margin: 0 }}>Step</h3>
                        <h1 style={{ margin: 0 }}>3</h1>
                    </Box>
                    <Box sx={textBoxStyles}>
                        Get Your Crate – Sit back and relax! Your curated crate will arrive right at your doorstep, ready to surprise and delight you.
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Steps;
