import { Avatar, Box, TextField, Checkbox, Container, Paper, Typography, FormControlLabel, Button,  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
// import { Link as RouterLink } from 'react-router-dom';

//eslint-disable-next-line
function SignUp(props) {
    const [formState, setFormState] = useState({ name: '', email: '', password: ''});
    const [addUser] = useMutation(ADD_USER);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const mutationResponse = await addUser({
        variables: {
          name: formState.name,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token)
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({ ...formState, [name]: value });
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
                        placeholder='Enter password'
                        fullWidth
                        required
                        type='password'
                        value={formState.password}
                        onChange={handleChange}
                    />
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