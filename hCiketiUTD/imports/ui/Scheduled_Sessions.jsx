import React, { FC, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh'; 
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"; 
import Typography from '@material-ui/core/Typography';
import { PatientsCollection } from '/imports/api/patients.js';
import { LobbySettingsCollection } from '/imports/api/lobbysettings.js';
import { SessionsCollection } from '/imports/api/sessions.js';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import { useTracker } from 'meteor/react-meteor-data';
import EditIcon from '@material-ui/icons/Edit';
import { ExampleRoute } from '/imports/ui/ExampleRoute.jsx'
import { PatientList } from '/imports/ui/Session_Setup.jsx'
//DIALOG BOX IMPORT BEGINS
import { render } from 'react-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
//DIALOG BOX IMPORT ENDS

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
}));

export const ScheduledSessions = () => {
  const listofusers = Meteor.users.find({}).fetch();
  const user = useTracker(() => Meteor.user());
  
  //find the appointments 
  var appointments = PatientsCollection.find({userId: user.profile.userId}).fetch(); 
  let appointmentsIds = appointments.map(({ appointmentId }) => appointmentId);
  var ScheduledSessions = SessionsCollection.find({appointmentId: {$in: appointmentsIds}}).fetch(); 
  var numberRecords = ScheduledSessions.length;
  var scheduleList = {};
  var dataStore = [];
  var i;
  for (i=0; i<numberRecords; ++i) {
    const apptId = ScheduledSessions[i].appointmentId;  
    var consultantUser = listofusers.find(function (element) {
      return element.profile.userId == ScheduledSessions[i].consultantUserId;
    });
    
    scheduleList  = 
    { 
      firstName: PatientsCollection.findOne({appointmentId: apptId}).firstName, 
      lastName: PatientsCollection.findOne({appointmentId: apptId}).lastName, 
      appointment: PatientsCollection.findOne({appointmentId: apptId}).nextAppointment.toLocaleString(), 
      age: PatientsCollection.findOne({appointmentId: apptId}).age,
      ReasonNextAppt: PatientsCollection.findOne({appointmentId: apptId}).ReasonNextAppt, 
      specialization: ScheduledSessions[i].consultantSpecialization,       
      consultant: consultantUser.profile.firstName.concat(' ',consultantUser.profile.lastName),
      SessionId: ScheduledSessions[i]._id,  //._str, 
      notes: ScheduledSessions[i].notesForSession, 
      duration: ScheduledSessions[i].meetingDuration.concat(' mins')
      //userId: ScheduledSessions[i].userId
    };
     
    dataStore.push(scheduleList);
 }
    
  const classes = useStyles();

  //DIALOG CODE
  const [camera, setCamera] = React.useState('0');
  const [cameraId, setCameraId] = React.useState('0');
  const [microphone, setMicrophone] = React.useState('0');

  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = (sessionid) => {
    Session.set('confSessionId', sessionid)
    setOpen(true);

    getDevices();
    sleep(1000).then(() => {
      let e = document.getElementById("videodevices");
      setCamera(cameras[0]);
      setCameraId(cameraIds[0]);
      for (i = 0; i < cameras.length; i++) {
        e.options[i].text = cameras[i];
        e.options[i].value = cameraIds[i];
      } 

      e = document.getElementById("audiodevices");
      setMicrophone(microphones[0]);
      for (i = 0; i < microphones.length; i++) {
        e.options[i].text = microphones[i];
        e.options[i].value = microphones[i];
      }      
    }) 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeCams = (event) => {
    setCamera(event.target.text);
    setCameraId(event.target.value);
  };

  const handleChangeMics = (event) => {
    setMicrophone(event.target.value);
  };
  //DIALOG CODE
  
  let cameras = [];
  let cameraIds = [];
  let microphones = [];

  async function getDevices() {     
    await navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        devices.forEach(function (device) {
          if (device.kind === 'videoinput') {
            cameras.push(device.label);
            cameraIds.push(device.deviceId);
          } 
          else if (device.kind == 'audioinput') {
            microphones.push(device.label);
          }    
        })  
      })     
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      }); 
  }
 
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
  const startStream= () => {
    //{ video: { deviceId: { exact: myExactCameraOrBustDeviceId } } }
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId: { exact: cameraId } }
    })
    .then(stream => {
      document.getElementById("vid").srcObject = stream;
    })
    
  };

  const stopStream=() => {
    try{
      document.getElementById("vid").srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  const submitChanges=() => {
    stopStream();
    let userId = user.profile.userId;
    let confSesionId = Session.get('confSessionId');
    try {
        const lobbySettings = LobbySettingsCollection.find({sessionId: confSesionId}).fetch();
        if (lobbySettings.length > 0){
          LobbySettingsCollection.remove({_id: lobbySettings[0]._id});
        }
        LobbySettingsCollection.insert({ sessionId: confSesionId, userId: userId, cameraId: cameraId, microphoneId: microphone, chromaKey: "0", chromaLevel: "0" });

        handleClose();
    } 
    catch (error) {
      alert("Could not save lobby settings")
      console.log(error);
    }
    
  }
    
  return (
   <Paper>
      <div  >  
        <Dialog dissableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Lobby Settings</DialogTitle>
            <DialogContent>
              <Button onClick= {startStream} variant="outlined" color="primary" >Turn Stream On</Button> &nbsp;
              <Button onClick= {stopStream} variant="outlined" color="primary" >Turn Stream Off</Button> &nbsp;
              <form className={classes.container}> 
                <FormControl className={classes.formControl}> 
                  <InputLabel htmlFor="grouped-native-select">Video</InputLabel>
                  <Select onChange={handleChangeCams} native defaultValue="" id="videodevices">
                      <option value={1}></option>
                      <option value={2}></option>
                      <option value={3}></option>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="grouped-native-select">Audio</InputLabel>
                  <Select onChange={handleChangeMics} native defaultValue="" id="audiodevices">
                      <option value={1}></option>
                      <option value={2}></option>
                      <option value={3}></option>
                      <option value={4}></option> 
                      <option value={5}></option>
                  </Select>
                </FormControl>
                <video height={500} width={550} id="vid" autoPlay muted="muted"/>
              </form>
            </DialogContent>
          <DialogActions>
            <IconButton autoFocus onClick={() => { stopStream(); handleClose();}} color="primary" className={classes.closeButton}><CloseIcon /></IconButton>
            <Button variant="outlined" color="primary"> View Patient Files </Button>
            <Button onClick= {() => { submitChanges();}} variant="outlined" color="primary"> Start Meeting </Button>
          </DialogActions>
        </Dialog>

        <div style={{ maxWidth: "80%", paddingTop: "12px", paddingLeft:"15px", margin: "1% 15%" }} >
    <MaterialTable
      // other props
      detailPanel={[
        
        {
        icon: 'Show Details',
            tooltip: 'Session Information',
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
                <u><center style={{ fontSize: 18}}>Session Information</center></u>
                <b>First Name:</b> {rowData.firstName} <br/>
                <b>Last Name:</b> {rowData.lastName} <br/>
                <b>Appointment Date/Time:</b> {rowData.appointment} <br/>
                <b>Duration:</b> {rowData.duration} <br/>
                <b>Consultant:</b> {rowData.consultant} <br/>
                <b>Specialization:</b> {rowData.specialization} <br/>              
                <b>Reason For Next Appt:</b> {rowData.ReasonNextAppt} <br/>
                <b>Notes:</b> {rowData.notes} <br/>
                
               <div style ={{textAlign: 'right', fontSize: 16}} >
                <Button style={{backgroundColor: '#0fb30', margin: "1% 2%"}} class="text-center" >Patient Files</Button>
                <Button style={{backgroundColor: '#0fb30', margin: "1% 2%"}} class="text-center" >Patient Images</Button>
                <Button onClick={() => { handleClickOpen(rowData.SessionId);}} style={{backgroundColor: '#0fb30', margin: "1% 2%"}} class="text-createsession" >Start Session</Button>
               </div> 
              </div>

            )
              
            },
          },
          {
        icon: NoteAddIcon,
            tooltip: 'Start Session',
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
                  backgroundColor: "#304269"
                }
              },
              {
                title: "Last Name",
                field: "lastName",
                headerStyle: {
                  backgroundColor: "#304269"
                }
              },
              {
                title: "Age",
                field: "age",
                
                headerStyle: {
                  backgroundColor: "#304269"
                }
              },
              {
                title: "Consulting Physician",
                field: "consultant",
                headerStyle: {
                  backgroundColor: "#304269"
                }
              },
              {
                title: "Session Duration",
                field: "duration",
                headerStyle: {
                  backgroundColor: "#304269"
                }
              },
              {
                title: "Appointment Details",
                field: "appointment",
                headerStyle: {
                  backgroundColor: "#304269"
                }
              },
              {
                title: "Reason",
                field: "ReasonNextAppt",
                headerStyle: {
                  backgroundColor: "#304269"
                }
              }
              

            ]}
            
            
      data= {dataStore}

            title="SCHEDULED SESSIONS"
            icons={{
              Clear: (props) => <DeleteIcon />,
              Search: (props) => <SearchIcon />,
              ResetSearch: (props) => <DeleteIcon />,
              FirstPage: (props) => <FirstPageIcon />,
              LastPage: (props) => <LastPageIcon />,
              
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
                backgroundColor: "#304269" ,
                color: "#FFF"
              }
            }}    
       /> 
        </div> 
       </div>

      </Paper>
    );
};
  