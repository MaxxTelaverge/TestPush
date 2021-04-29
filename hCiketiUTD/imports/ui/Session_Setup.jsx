import React, { FC, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
//import patientData from '/lib/patientData.js'; 
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PatientsCollection } from '/imports/api/patients.js';
import { SessionsCollection } from '/imports/api/sessions.js';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import { useTracker } from 'meteor/react-meteor-data';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AddSessionParameters } from './SessionSetup/AddSessionParameters'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


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
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export const PatientList = () => {
  const user = useTracker(() => Meteor.user());
  var PatientList = PatientsCollection.find({ userId: user.profile.userId }).fetch(); //tried calling the extension for profile but the meteor.user function only retuens the _id and the Name values, will keep doing more research
  var numberRecords = PatientList.length;

  //Modal Open/Close Handlers
  const [open, setOpen] = React.useState(false);
  const [passPatientID, setPassPatientID] = React.useState(0);

  const handleOpen = (id) => {
    setOpen(true);
    setPassPatientID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  var patientList = {};
  var dataStore = [];
  var i;
  for (i = 0; i < numberRecords; ++i) {
    //Check if session has already been created for this Patient Schedule.
    var sessionExists = 0; 
    var arrlength = SessionsCollection.find({appointmentId: PatientList[i].appointmentId}).fetch().length;
    if (arrlength > 0)
    {
      sessionExists = 1;
    }

    patientList =
    {
      firstName: PatientList[i].firstName, lastName: PatientList[i].lastName, dob: PatientList[i].dob.toDateString(),
      lastAppointment: PatientList[i].lastAppointment.toLocaleString(), nextAppointment: PatientList[i].nextAppointment.toLocaleString(), address: PatientList[i].address, age: PatientList[i].age, height: PatientList[i].height, weight: PatientList[i].weight,
      sex: PatientList[i].sex, gender: PatientList[i].gender, ethnicity: PatientList[i].ethnicity, ReasonLastAppt: PatientList[i].ReasonLastAppt, ReasonNextAppt: PatientList[i].ReasonNextAppt, patientId: PatientList[i].patientId, userId: PatientList[i].userId, appointmentId: PatientList[i].appointmentId,
      sessionExists: sessionExists
    };
    dataStore.push(patientList);
  }

  const classes = useStyles();

  var getAllConsultants = [];

  Meteor.users.find().map(user => {
    if (user.profile.type === "consultant") {
      let obj = { 
        name: user.profile.firstName + " " + user.profile.lastName,
        id: user.profile.userId
      };
      getAllConsultants.push(obj);
    }
  });

  return (    
    <Paper>
     <div  >
        <div style={{ maxWidth: "80%", paddingTop: "12px", paddingLeft:"15px", margin: "1% 15%" }} >
          <Router>
            <MaterialTable
              // other props
              detailPanel={[
                {
                  tooltip: 'Show Details',
                  render: rowData => {
                    return (
                      <div
                        style={{
                          fontSize: 14,
                          textAlign: 'left',
                          color: 'white',
                          backgroundColor: '#808080',
                        }}
                      >
                        <u><center style={{ fontSize: 18 }}>Patient Information</center></u>
                        <b>First Name:</b> {rowData.firstName} <br />
                        <b>Last Name:</b> {rowData.lastName} <br />
                        <b>DOB:</b> {rowData.dob} <br />
                        <b>Sex Assigned At Birth:</b> {rowData.sex} <br />
                        <b>Address:</b> {rowData.address} <br />
                        <b>Height:</b> {rowData.height} <br />
                        <b>Weight:</b> {rowData.weight} <br />
                        <b>Gender:</b> {rowData.gender} <br />
                        <b>Ethnicity:</b> {rowData.ethnicity} <br />
                        <b>Reason For Last Appt:</b> {rowData.ReasonLastAppt} <br />
                        <b>Reason For Next Appt:</b> {rowData.ReasonNextAppt} <br />
                        <b>Patient Id:</b> {rowData.patientId} <br />
                        <div style={{ textAlign: 'right', fontSize: 16 }} >
                          <Button style={{ backgroundColor: '#0fb30', margin: "1% 2%" }} class="text-center" >Patient Files</Button>
                          <Button style={{ backgroundColor: '#0fb30', margin: "1% 2%" }} class="text-center" >Patient Images</Button>
                          {rowData.sessionExists !== 1 ?
                            <Button onClick={() => { handleOpen(rowData.appointmentId)}} style={{ backgroundColor: '#0fb30', margin: "1% 2%" }} class="text-createsession" >Create Session</Button>
                            :
                           <Button onClick={() => { handleOpen(rowData.appointmentId)}} style={{ backgroundColor: '#0fb30', margin: "1% 2%" }} class="text-editsession" >Edit Session</Button>
                          }                          
                        </div>
                      </div>
                    )
                  },
                },
                {
                  icon: NoteAddIcon,
                  tooltip: 'Create Session',
                  render: rowData => {
                    return (
                      <div
                        style={{
                          fontSize: 100,
                          textAlign: 'center',
                          color: 'white',
                          backgroundColor: '#E53935',
                        }}
                      >

                      </div>

                    )
                  },
                },
                {
                  icon: ImageIcon,
                  tooltip: 'Patient Images',
                  render: rowData => {
                    return (
                      <div
                        style={{
                          fontSize: 100,
                          textAlign: 'center',
                          color: 'white',
                          backgroundColor: '#E53935',
                        }}
                      >

                      </div>
                    )
                  },
                },
                {
                  icon: DescriptionIcon,
                  tooltip: 'Patient Files',
                  render: rowData => {
                    return (
                      <div
                        style={{
                          fontSize: 100,
                          textAlign: 'center',
                          color: 'white',
                          backgroundColor: '#E53935',
                        }}
                      >

                      </div>
                    )
                  },
                },
              ]}
              columns={[
                {
                  title: "First Name",
                  field: "firstName",
                  headerStyle: {
                    backgroundColor: "gray"
                  }
                },
                {
                  title: "Last Name",
                  field: "lastName",
                  headerStyle: {
                    backgroundColor: "gray"
                  }
                },
                {
                  title: "Age",
                  field: "age",
                  type: "numeric",
                  headerStyle: {
                    backgroundColor: "gray"
                  }
                },
                {
                  title: "Last Appointment",
                  field: "lastAppointment",
                  headerStyle: {
                    backgroundColor: "gray"
                  }
                },
                {
                  title: "Reason",
                  field: "ReasonLastAppt",
                  headerStyle: {
                    backgroundColor: "gray"
                  }
                },
                {
                  title: "Next Appointment",
                  field: "nextAppointment",
                  defaultSort: "asc",
                  headerStyle: {
                    backgroundColor: "gray"
                  }
                },
                {
                  title: "Reason",
                  field: "ReasonNextAppt",
                  headerStyle: {
                    backgroundColor: "gray"
                  }
                }

              ]}

              data={dataStore}

              title="SESSION SETUP"
              icons={{
                Clear: (props) => <DeleteIcon />,
                Search: (props) => <SearchIcon />,
                ResetSearch: (props) => <DeleteIcon />,
                FirstPage: (props) => <FirstPageIcon />,
                LastPage: (props) => <LastPageIcon />,
                //NavigateNext: (props) => <NavigateNextIcon />,
                //PreviousPage: (props) => <PreviousPageIcon />
              }}

              components={{
                Action: (props) => (
                  <Button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    color="primary"
                    variant="text"
                    style={{ textTransform: "none" }}
                    size="small"
                  >
                    Save
                  </Button>
                )
              }}
              options={{
                headerStyle: {
                  backgroundColor: "gray" /*"#01579b"*/,
                  color: "#FFF"
                }
              }}
            />
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <AddSessionParameters onCloseModal={handleClose} consultantList={getAllConsultants} association={user.profile.association} patientId={passPatientID}/>
                </div>
              </Fade>
            </Modal>
            <Switch>
            </Switch>
          </Router>
        </div>
      </div>
      <div >
        <Typography color="textSecondary" align="center">
          No users for this project yet
            </Typography>
      </div>
    </Paper>
  );
};

