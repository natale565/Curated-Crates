import { Avatar, Box, TextField, Checkbox, Container, Paper, Typography, FormControlLabel, Button,  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { REGISTER } from '../utils/mutations';
// import { Link as RouterLink } from 'react-router-dom';

//eslint-disable-next-line
function SignUp(props) {
    const [formState, setFormState] = useState({ name: '', email: '', password: '', rememberMe: false });
    const [register, { error }] = useMutation(REGISTER);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const mutationResponse = await register({
              variables: {
                  name: formState.name,
                  email: formState.email,
                  password: formState.password,
              },
          });
            
          const { data } = mutationResponse;
          const token = mutationResponse?.data?.register?.token;
          const user = mutationResponse?.data?.register?.user;
  
          console.log("data", data);
          console.log("Token:", token);
          console.log("User:", user);
  
          if (!token) {
              throw new Error("Token is missing in the response.");
          }
  
          Auth.login(token);
  
          if (formState.rememberMe) {
              localStorage.setItem('email', formState.email);
          } else {
              localStorage.removeItem('email');
          }
      } catch (e) {
          console.error("Error during sign up:", e);
      }
  };
  
  
    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      setFormState({ ...formState, [name]: type === 'checkbox' ? checked : value });
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
                Sign Up
            </Typography>
            <Box 
            component='form' 
            onSubmit={handleSubmit} 
            noValidate sx={{mt: 1}}>
                <TextField
                        name='name'
                        placeholder='Enter name'
                        fullWidth
                        required
                        autoFocus
                        value={formState.name}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
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
                        placeholder='Enter password (min 8 characters)'
                        fullWidth
                        required
                        type='password'
                        value={formState.password}
                        onChange={handleChange}
                    />
                <FormControlLabel control={<Checkbox name='rememberMe' checked={formState.rememberMe} onChange={handleChange} color='primary' />} label='Remember me'/>
                <Button type='submit' fullWidth variant='contained' sx={{mt: 1}}>Sign Up</Button>
            </Box>
 
          </Paper>
        </Container>
    )
}

export default SignUp;