import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

//with this page, the Login.jsx component is no longer required
const Login = ({ handleChange }, { handleChange2 }) => {
    const paperStyle = {padding: 20, height: '60vh', width: 600, margin: "0 auto" }
    const btnstyle = { margin: '8px 0', color:'', backgroundColor: '#304269' }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

    }));
    const classes = useStyles();
    const [openLoginErrorModel, setOpenLoginErrorModal] = React.useState(false);
    const handleOpenLoginErrorModal = () => {
        setOpenLoginErrorModal(true);
    };

    const handleCloseLoginErrorModal = () => {
        setOpenLoginErrorModal(false);
    };
    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
        Accounts.onLoginFailure(function (attempt) {
            if (attempt.error) {
                var reason = attempt.error.reason;
                handleOpenLoginErrorModal();
                console.log(reason);
            }
        });
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid >
                    <div>
                        <img alt="app icon" width="500" src="https://i.ibb.co/PM9qNFC/Logo.png" />
                    </div>
                </Grid>
                <Grid align='center'>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required
                           onChange={e => setUsername(e.target.value)}
                />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required
                           onChange={e => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type="submit" color='primary' variant="contained" style={btnstyle} fullWidth onClick={submit}>Sign in</Button>
                <Typography >
                    <Link href="#">
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openLoginErrorModel}
                onClose={handleCloseLoginErrorModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openLoginErrorModel}>
                    <div className={classes.paper}>
                        <h2>Incorrect login credentials</h2>
                        <Button onClick={handleCloseLoginErrorModal} size="large" variant="contained">Close</Button>
                    </div>
                </Fade>
            </Modal>
        </Grid>



    )
}

export default Login