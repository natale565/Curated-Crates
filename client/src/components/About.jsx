import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function BoxBasic() {
  return (
    <Box
      component="section"
      sx={{
        maxWidth: '70%',
        margin: 'auto',
        marginBottom: 5,
        p: 4,
        border: '2px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#333',
        
        textAlign: 'center'
      }}
    >
      <Typography variant="h4" sx={{ fontFamily: 'Quicksand', fontSize: '30px', mb: 2, fontWeight: 'bold', color: 'white' }}>
        About Us
      </Typography>
      
      <Typography variant="body1" sx={{ fontFamily: 'Quicksand', fontSize: '18px', color: 'white', lineHeight: 1.6, }}>
        Welcome to Curated Crates – where discovery meets delight! We’re a subscription service dedicated to delivering expertly curated boxes filled with items tailored to elevate your lifestyle. With options for monthly or quarterly deliveries, you’re in control of how often you indulge in new surprises.
        <br /><br />
        Choose from our unique box categories each with premium and hand selected items.
        <br /><br />
        At Curated Crates, we believe in making every delivery an experience – thoughtfully curated, just for you.
      </Typography>
    </Box>
  );
}

export default BoxBasic;
