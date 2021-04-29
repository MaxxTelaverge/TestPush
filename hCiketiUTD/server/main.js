import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { Accounts } from 'meteor/accounts-base'; 
import { PatientsCollection } from '../imports/api/patients';
import { SessionsCollection } from '../imports/api/sessions';
import { LobbySettingsCollection } from '/imports/api/lobbysettings.js';
import { useTracker } from 'meteor/react-meteor-data';
import { SessionSettingsCollection } from '/imports/api/sessionSettings.js';

const PASSWORD_EX = 'password';

Meteor.startup(() => {
  if(Meteor.users.find().count() == 0)
  {
    Accounts.createUser({
      username: 'janedoe@domain.com',
      email: 'janedoe@domain.com',
      password: PASSWORD_EX,
      userId: 1234,
      profile: {
        firstName: "Jane",
        lastName: "Doe",
        isDoctor: true,
        userId: 1234,
        type: 'doctor',
        association: 'Medical City',
        authentication_token: 12345
      }
    });
    
    Accounts.createUser({
      username: 'johndoe@domain.com',
      email: 'johndoe@domain.com',
      password: PASSWORD_EX,
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        isDoctor: false,
        userId: 4321,
        type: 'consultant',
        association: 'Medical City',
        authentication_token: 54321
      }
    });

    Accounts.createUser({
      username: 'sanjaygupta@domain.com',
      email: 'sanjaygupta@domain.com',
      password: PASSWORD_EX,
      profile: {
        firstName: "Sanjay",
        lastName: "Gupta",
        isDoctor: true,
        userId: 5678,
        type: 'doctor',
        association: 'Medical City',
        authentication_token: 12334
      }
    });
  }
  
/*
  SessionsCollection.insert({
      lastName: 'Doe',
      firstName: 'John',
      appointment: new Date(2021, 04, 11),
      consultant: 'Dr. Richard Garland',
      specialization: 'Cardiologist',
      age: 31,
      ReasonNextAppt: 'Cardiothoracic Surgery',
      userId: 1234,
      patientId: 5461

    });*/

    /*PatientsCollection.insert({
      lastName: 'Doe',
      firstName: 'John',
      dob: new Date(1990, 11, 10),
      lastAppointment: new Date(2021, 03, 10),
      nextAppointment: new Date(2021, 04, 11),
      address: '800 West Campbell Road Richardson, TX 75080',
      age: 31,
      height: 72,
      weight: 160,
      sex: 'Male',
      gender: 'Male',
      ethnicity: 'Caucasian',
      ReasonLastAppt: 'Double Bypass Cardiothoracic Surgery',
      ReasonNextAppt: 'Follow-up visit',
      userId: 'hSxS8dg5vYKmhB7CS',
      patientId: 5461

    },
    {
      lastName: 'Doe',
      firstName: 'Jane',
      dob: new Date(1986, 12, 09),
      lastAppointment: new Date(2021, 02, 10),
      nextAppointment: new Date(2021, 05, 11),
      address: '800 West Campbell Road Richardson, TX 75080',
      age: 34,
      height: 62,
      weight: 120,
      sex: 'Female',
      gender: 'Female',
      ethnicity: 'Hispanic',
      ReasonLastAppt: 'Lung tissue Tumor Removal Surgery',
      ReasonNextAppt: 'Follow-up visit',
      userId: 4321,
      patientId: 5462

    },

    );*/
});

if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllPatients: function() {
        const user = useTracker(() => Meteor.user());
        console.log(user.profile.userId);
        return PatientsCollection.remove({userId: user.profile.userId});
    /*return PatientsCollection.remove();*/
      }
    });
  });
}

