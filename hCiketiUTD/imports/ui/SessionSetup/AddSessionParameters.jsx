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
        value: '30',
        label: '30 Minutes',
    },
    {
        value: '60',
        label: '1 Hour',
    },
    {
        value: '90',
        label: '1 Hour 30 Minutes',
    },
    {
        value: '120',
        label: '2 Hours',
    },
    {
        value: '150',
        label: '2 Hours 30 Minutes',
    },
    {
        value: '180',
        label: '3 Hours',
    },
];


export const AddSessionParameters = ({ onCloseModal, patientId,association,consultantList }) => {
    const user = useTracker(() => Meteor.user());
    const classes = useStyles();

    
    //Check if session exists and if yes, get the necessary fields from the session collection
    let sessionExists = 0
    var defaultDuration = meetingDuration[0].value
    var defaultNotes = ""
    var defaultConsultantSpecialization = ""
    var defaultConsultingID = consultantList[0].id
    var defaultConsulting = consultantList[0].name

    const sessionForAppointment = SessionsCollection.find({appointmentId: patientId}).fetch();
    if (sessionForAppointment.length > 0)
    {
        sessionExists = 1;

        const listofusers = Meteor.users.find({}).fetch();
        var consultantUser = listofusers.find(function (element) {
            return element.profile.userId == sessionForAppointment[0].consultantUserId
        });    

      defaultDuration = sessionForAppointment[0].meetingDuration;
      defaultNotes = sessionForAppointment[0].notesForSession;
      defaultConsultantSpecialization = sessionForAppointment[0].consultantSpecialization;
      defaultConsultingID = sessionForAppointment[0].consultantUserId;
      defaultConsulting = consultantUser.profile.firstName + " " + consultantUser.profile.lastName;
    }

    //Add Session Fields
    const [clientHospital, setclientHospital] = useState('');
    const [notesForSession, setnotesForSession] = useState(defaultNotes);
    const [consultantSpecialization, setconsultantSpecialization] = useState(defaultConsultantSpecialization);
    const [duration, setMeetingDuration] = React.useState(defaultDuration);
    const [consulting, setConsulting] = React.useState(defaultConsulting);
    const [consultingID, setConsultingID] = React.useState(defaultConsultingID);

    //Dropdown Controllers
    const handleChange = (event) => {
        setMeetingDuration(event.target.value);
    };
    const handleChangeConsulting = (event) => {
        setConsulting(event.target.value);

        for (var obj in consultantList) {
            if(obj.name == event.target.value){
                setConsultingID(obj.id);
            }
        }
    };

    //Submit Session to Database
    function handleSubmitSession(event) {
        event.preventDefault();
        const sessionStatus = "New"
        const roomId = "0"
        console.log("client hospital: ", clientHospital, "notesForSession: ", notesForSession, "specilization: ", consultantSpecialization, "duration: ", duration, "consulting id:", consultingID);
            try {
                if (clientHospital === '') {
                    setclientHospital(association)
                }
                console.log(patientId);

                if (sessionExists){
                    SessionsCollection.update({ _id: sessionForAppointment[0]._id},{appointmentId: patientId, meetingDuration: duration, sessionStatus: sessionStatus, roomId: roomId, consultantUserId: consultingID, consultantSpecialization: consultantSpecialization, notesForSession: notesForSession })

                }
                else{
                    SessionsCollection.insert({ appointmentId: patientId, meetingDuration: duration, sessionStatus: sessionStatus, roomId: roomId, consultantUserId: consultingID, consultantSpecialization: consultantSpecialization, notesForSession: notesForSession })
                }

                
                handleOpenSuccessModal();

            } catch (error) {
                alert("Could not make create/update cosnultation session")
                console.log(error);
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
                        {consultantList.map((option) => (
                            <option key={option.name} value={option.id}>
                                {option.name}
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
                        disabled
                        id="outlined-required"
                        label="Clinic/Hospital"
                        name="clinicHospital"
                        variant="outlined"
                        value={association}
                        onInput={e => setclientHospital(e.target.value)}
                    />
                    <TextField
                        id="outlined-required"
                        label="consultantSpecialization"
                        name="consultantSpecialization"
                        variant="outlined"
                        value={consultantSpecialization}
                        onInput={e => setconsultantSpecialization(e.target.value)}

                    />
                </div>
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Reason for Consultation / notesForSession"
                        name="notesForSession"
                        multiline
                        rows={8}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={notesForSession}
                        onInput={e => setnotesForSession(e.target.value)}
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
                        <h2 id="transition-modal-title">Session Successfully Added</h2>
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

