import React, { FC, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { SessionsCollection } from '/imports/api/sessions.js';
import { useTracker } from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const meetingDuration = [
    {
        value: '0',
        label: '0 Minutes',
    },
    {
        value: '10',
        label: '10 Minutes',
    },
    {
        value: '20',
        label: '20 Minutes',
    },
    {
        value: '30',
        label: '30 Minutes',
    },
    {
        value: '45',
        label: '45 Minutes',
    },
    {
        value: '60',
        label: '1 Hour',
    },

];

const consultingDoctors = [
    {
        value: 'Robert',
        label: 'Robert',
    },
    {
        value: 'Smith',
        label: 'Smith',
    },
    {
        value: 'John',
        label: 'John',
    },
    {
        value: 'Mark',
        label: 'Mark',
    },
];



export const EditSessionParameters = ({ onCloseModal, id, clientHospital, notes, specialization, duration, consulting }) => {
    const user = useTracker(() => Meteor.user());
    const classes = useStyles();

    //Add Session Fields
    const [clientHospital, setclientHospital] = useState('');
    const [notes, setNotes] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [duration, setMeetingDuration] = React.useState('0');
    const [consulting, setConsulting] = React.useState('0');

    //Dropdown Controllers
    const handleChange = (event) => {
        setMeetingDuration(event.target.value);
    };
    const handleChangeConsulting = (event) => {
        setConsulting(event.target.value);
    };

    //Submit Session to Database
    function handleSubmitSession(event) {
        event.preventDefault();

        console.log("client hospital: ", clientHospital, "notes: ", notes, "specilization: ", specialization, "duration: ", duration, "consulting:", consulting);
            try {
                SessionsCollection.update({_id: id},{ clientHospital, notes, specialization, duration, consulting, userId: user.profile.userId })
                const test = SessionsCollection.find({ userId: user.profile.userId }).fetch();
                console.log("results", test);
                handleOpenSuccessModal();
                // onCloseModal();

            } catch (error) {
                alert("Could not make appointment")
            }
    }


    //Modal Open/Close Handlers
    const [openSuccessModal, setOpenSuccessModal] = React.useState(false);

    const handleOpenSuccessModal = () => {
        setOpenSuccessModal(true);
    };

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmitSession} className={classes.root} noValidate autoComplete="off">
                <h4>SESSION SETUP</h4>
                <br />
                <div>
                    <TextField
                        id="outlined-required"
                        select
                        label="Consulting Physician"
                        value={consulting}
                        name="consultingPhysicianID"
                        onChange={handleChangeConsulting}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >
                        {consultingDoctors.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-required"
                        select
                        label="Meeting Duration"
                        name="meetingDuration"
                        value={duration}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >
                        {meetingDuration.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>

                </div>
                <div>
                    <TextField
                        id="outlined-required"
                        label="Clinic/Hospital"
                        name="clinicHospital"
                        variant="outlined"
                        value={clientHospital}
                        onInput={e => setclientHospital(e.target.value)}
                    />
                    <TextField
                        id="outlined-required"
                        label="Specialization"
                        name="specialization"
                        variant="outlined"
                        value={specialization}
                        onInput={e => setSpecialization(e.target.value)}

                    />
                </div>
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Reason for Consultation / Notes"
                        name="notes"
                        multiline
                        rows={8}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={notes}
                        onInput={e => setNotes(e.target.value)}


                    />
                </div>
                <div>
                    <Button onClick={onCloseModal} size="large" variant="contained">Cancel</Button>
                    <Button type="submit" value="Submit" size="large" variant="contained" color="primary">Submit</Button>
                </div>

            </form>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openSuccessModal}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Session Successfully Updated</h2>
                        <br/><br/><br/>
                        <h6>Consulting Physician: Dr. {consulting}</h6>
                        <h6>Date: </h6>
                        <h6>Time: </h6>
                        <br/><br/><br/>
                        <Button onClick={onCloseModal} size="large" variant="contained">Exit</Button>

                    </div>
                </Fade>
            </Modal>

        </div>

    );

};

