import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const UserNameInputForm = () => {
  const [userName, setUserName] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleDialogClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
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
        style={{ marginBottom: '23vh', backgroundColor: '#1976d2' }}
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
        variant='outlined'
        label='Username'
        type='text'
        onChange={handleChange}
        required
        style={{ marginBottom: '11vh' }}
      />
      <div>{ConfirmButton()}</div>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Username field must be filled in!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserNameInputForm;
