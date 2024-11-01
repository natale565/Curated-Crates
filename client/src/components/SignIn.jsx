import { Avatar, Box, TextField, Checkbox, Container, Paper, Typography, FormControlLabel, Button,  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
// import { Link as RouterLink } from 'react-router-dom';

//eslint-disable-next-line
function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      }); 
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  return (
        <Container maxWidth='xs'>
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
                Sign In
            </Typography>
            <Box 
            component='form' 
            onSubmit={handleFormSubmit} 
            noValidate sx={{mt: 1}}>
                 <TextField
                        name='email'
                        placeholder='Enter email'
                        fullWidth
                        required
                        type='email'
                        value={formState.email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name='password'
                        placeholder='Enter password'
                        fullWidth
                        required
                        type='password'
                        value={formState.password}
                        onChange={handleChange}
                    />
                <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me'/>
                <Button type='submit' fullWidth variant='contained' sx={{mt: 1}}>Sign In</Button>
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

export default Login;