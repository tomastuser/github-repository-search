import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

const UserNameInputForm = () => {
  const [userName, setUserName] = useState('');
  const [open, setOpen] = useState(false);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  function ConfirmButton() {
    let history = useHistory();

    function handleClick() {
      userName.length > 0 ? history.push(`/${userName}/list`) : setOpen(true);
    }

    return (
      <Button
        variant='contained'
        color='primary'
        size='large'
        onClick={handleClick}
        style={{ marginBottom: '23vh' }}
      >
        List Repositories and Organizations
      </Button>
    );
  }
  return (
    <div
      className='containerIntro'
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100vh',
      }}
    >
      <Typography
        variant='h2'
        component='h2'
        style={{ marginBottom: '11vh', marginTop: '20vh' }}
      >
        Enter Github Username:
      </Typography>
      <TextField
        id='username'
        variant='standard'
        label='Username'
        type='text'
        onChange={handleChange}
        style={{ marginBottom: '11vh' }}
      />
      <div>{ConfirmButton()}</div>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            color='error'
            style={{ padding: '10vh', fontSize: '1.3rem' }}
          >
            Please fill in the username.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserNameInputForm;
