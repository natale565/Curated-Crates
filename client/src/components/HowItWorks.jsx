import Box from '@mui/material/Box';

function Steps() {
    // Shared styles
    const stepBoxStyles = {
        display: 'flex',
        flexDirection: 'row', // Step number and image/text side by side
        alignItems: 'flex-start', // Align all items to the top left
        border: '2px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        p: 2,
        minWidth: '300px',
        textAlign: 'left',
        gap: '10px',
        alignSelf: 'flex-start', // Align the step box to the left
    };

    const numberBoxStyles = {
        display: 'flex',
        flexDirection: 'column', // Stack the number vertically
        alignItems: 'center',
        pr: 2,
        mr: 2,
        borderRight: '1px solid grey',
    };

    const contentBoxStyles = {
        display: 'flex',
        flexDirection: 'column', // Stack image on top of the text
        alignItems: 'flex-start', // Align image and text to the left
        maxWidth: '400px', // Limit the text width to match image
    };

    const textBoxStyles = {
        textAlign: 'left', // Align text to the left
        marginTop: '10px', // Space between image and text
        maxWidth: '400px', // Limit text to match the image width
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
                    <Box sx={contentBoxStyles}>
                        <img src="./public/images/How-It-Works-Step-1.jpg" alt="Step 1" style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
                        <Box sx={textBoxStyles}>
                            Choose Your Box – Begin by exploring our many different  unique box options. Each is thoughtfully crafted to bring you joy, discovery, and quality with every delivery.
                        </Box>
                    </Box>
                </Box>

                {/* Step 2 */}
                <Box sx={stepBoxStyles}>
                    <Box sx={numberBoxStyles}>
                        <h3 style={{ margin: 0 }}>Step</h3>
                        <h1 style={{ margin: 0 }}>2</h1>
                    </Box>
                    <Box sx={contentBoxStyles}>
                        <img src="./public/images/How-It-Works-Step-2-Credit-john-schnobric.jpg" alt="Step 2" style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
                        <Box sx={textBoxStyles}>
                            Pick Your Tier – Select a tier that matches your desired experience. Higher tiers offer an even greater assortment of premium items, tailored to enhance each delivery.
                        </Box>
                    </Box>
                </Box>

                {/* Step 3 */}
                <Box sx={stepBoxStyles}>
                    <Box sx={numberBoxStyles}>
                        <h3 style={{ margin: 0 }}>Step</h3>
                        <h1 style={{ margin: 0 }}>3</h1>
                    </Box>
                    <Box sx={contentBoxStyles}>
                        <img src="./public/images/How-It-Works-Step-1.jpg" alt="Step 3" style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
                        <Box sx={textBoxStyles}>
                            Get Your Crate – Sit back, relax, and let the excitement build! Your curated crate will arrive right at your doorstep, packed with delightful surprises all tailored to bring you joy and discovery with every unboxing.
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Steps;
