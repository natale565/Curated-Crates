import Box from '@mui/material/Box';

function Steps() {
    return (
        <>
            <Box component="div" sx={{ display: 'flex', gap: 2 }}>
                <Box component="div" sx={{ flex: 1 }}>
                    <h2>Step 1</h2>
                    <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur officia hic saepe maxime quo incidunt itaque possimus ut, beatae corrupti. Saepe dolore debitis illum et pariatur nulla aut, assumenda esse.
                    </Box>
                </Box>

                <Box component="div" sx={{ flex: 1 }}>
                    <h2>Step 2</h2>
                    <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo suscipit nam voluptate, accusantium consectetur, repellat rem est id facilis culpa eligendi sint! Voluptate placeat sed ex quae quis nihil voluptas?
                    </Box>
                </Box>

                <Box component="div" sx={{ flex: 1 }}>
                    <h2>Step 3</h2>
                    <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi non nihil culpa labore odio laborum quae necessitatibus magni quisquam officiis minima, assumenda in nostrum illum reprehenderit? Deleniti iste temporibus fugit!
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Steps;
