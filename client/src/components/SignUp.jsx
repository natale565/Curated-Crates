import { Avatar, Box, TextField, Checkbox, Container, Paper, Typography, FormControlLabel, Button,  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { Link as RouterLink } from 'react-router-dom';

const SignUp = () => {
    const handleSubmit = () => console.log('SignIn');
    return (
        <Container maxwidth='xs'>
          <Paper elevation={10} sx= {{ marginTop: 8, padding: 2}}>
            <Avatar 
              sx={{
                mx: 'auto',
                bgcolor: 'secondary.main',
                textAlign: 'center',
                mb: 1,
              }}
            >
                <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5' sx={{textAlign: 'center'}}>
                Sign Up
            </Typography>
            <Box 
            component='form' 
            onSubmit={handleSubmit} 
            noValidate sx={{mt: 1}}>
                <TextField placeholder='Enter username' fullWidth required autoFocus sx={{mb: 2}}/>
                <TextField placeholder='Enter password' fullWidth required type='password' />
                <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me'/>
                <Button type='submit' fullWidth variant='contained' sx={{mt: 1}}>Sign Up</Button>
            </Box>
            {/* <Grid container justifyContent='space-between' sx={{mt: 1}}>
                <Grid item>
                    <Link component={RouterLink} to='/forgot'>
                    Forgot password?
                    </Link>
                </Grid>
            </Grid> */}
 
          </Paper>
        </Container>
    )
}

export default SignUp;