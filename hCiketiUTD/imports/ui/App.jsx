import React from 'react';
import { Login } from './Login.jsx';
import { Homepage_Constultant } from './Homepage/Homepage_constultant';
import { Homepage_Doctor } from './Homepage/Homepage_doctor';
import { useTracker } from 'meteor/react-meteor-data';
import { PatientList } from '/imports/ui/Session_Setup';
import { PatientsCollection } from '/imports/api/patients';
import { ScheduledSessions } from '/imports/ui/Scheduled_Sessions';
import { RemoteScheduledSessions } from '/imports/ui/Scheduled_Sessions_Remote';
import SignInOutContainer from './LoginPage_TopMenu.jsx';
import LoginPageTopMenu from './SignInOutContainer.jsx';
import Navbar from '../api/components/SideMenu/Navbar';
import Home from '../api/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => {
    //Meteor.call('removeAllPatients');
    Meteor.logout();
  };
  /*if (user.profile.type == 'doctor') {
     //Delete and Insert queries for patients
    console.log("Ready to delete patients")
    Meteor.call('removeAllPatients');
      console.log(user.profile.userId);
      if (user.profile.userId == 1234){ 
      console.log('test');
PatientsCollection.insert({lastName: 'Doe',
        firstName: 'John',
        dob: new Date("1990-11-10"),
        lastAppointment: new Date("2021-03-10"),
        nextAppointment: new Date("2021-04-11"),
        address: '800 West Campbell Road, Richardson, TX 75080',
       age: 31,
       height: 72,
       weight: 160,
       sex: 'Male',
       gender: 'Male',
       ethnicity: 'Caucasian',
       ReasonLastAppt: 'Double bypass cardiothoracic surgery',
       ReasonNextAppt: 'Follow-up visit',
       userId: 1234,
       patientId: 5461,
       appointmentId: 1111
     });

PatientsCollection.insert({lastName: 'Albright',
       firstName: 'Hannah',
       dob: new Date("1993-07-21"),
       lastAppointment: new Date("2021-02-13"),
       nextAppointment: new Date("2021-05-01"),
       address: '80350 West Houston Road, Richardson, TX 75080',
       age: 27,
       height: 62,
       weight: 120,
       sex: 'Female',
       gender: 'Female',
       ethnicity: 'Caucasian',
       ReasonLastAppt: 'Lasik eye surgery',
       ReasonNextAppt: 'Follow-up visit',
       userId: 1234,
       patientId: 5462,
       appointmentId: 2222
     });

PatientsCollection.insert({lastName: 'Burrow',
       firstName: 'David',
       dob: new Date("1992-02-07"),
       lastAppointment: new Date("2021-03-12"),
       nextAppointment: new Date("2021-04-15"),
       address: '3056 South Texas Pkwy, Plano, TX 75023',
       age: 29,
       height: 75,
       weight: 180,
       sex: 'Male',
       gender: 'Male',
       ethnicity: 'Caucasian',
       ReasonLastAppt: 'Lymph node biopsy',
       ReasonNextAppt: 'Benign tumor removal surgery',
       userId: 1234,
       patientId: 5463,
       appointmentId: 3333
     });

PatientsCollection.insert({lastName: 'Garcia',
       firstName: 'Marta',
       dob: new Date("1990-12-05"),
       lastAppointment: new Date("2021-02-07"),
       nextAppointment: new Date("2021-03-21"),
       address: '1750 Falling leaf Lane, Richardson, TX 75080',
       age: 31,
       height: 64,
       weight: 135,
       sex: 'Female',
       gender: 'Female',
       ethnicity: 'Hispanic',
       ReasonLastAppt: 'Stress test & electrocardiogram evaluation',
       ReasonNextAppt: 'Angioplasty',
       userId: 1234,
       patientId: 5464,
       appointmentId: 4444
     });

PatientsCollection.insert({lastName: 'Lee',
       firstName: 'Linda',
       dob: new Date("1962-06-26"),
       lastAppointment: new Date("2020-09-02"),
       nextAppointment: new Date("2021-03-25"),
       address: '1500 South Congress Road, Dallas, TX 75080',
       age: 58,
       height: 60,
       weight: 110,
       sex: 'Female',
       gender: 'Female',
       ethnicity: 'Asian/Pacific Islander',
       ReasonLastAppt: 'Breast tissue tumor removal Surgery',
       ReasonNextAppt: 'Follow-up visit',
       userId: 1234,
       patientId: 5465,
       appointmentId: 5555
     });
PatientsCollection.insert({lastName: 'Garcia',
       firstName: 'Alex',
       dob: new Date("1971-05-24"),
       lastAppointment: new Date("2020-07-01"),
       nextAppointment: new Date("2021-04-25"),
       address: '153 South Freemont Road, Dallas, TX 75070',
       age: 58,
       height: 60,
       weight: 110,
       sex: 'Male',
       gender: 'Male',
       ethnicity: 'Hispanic',
       ReasonLastAppt: 'Electrocardiogram & chemical stress test',
       ReasonNextAppt: 'Angioplasty',
       userId: 1234,
       patientId: 5466,
       appointmentId: 6666
     });
PatientsCollection.insert({lastName: 'Barrett',
       firstName: 'Hugh',
       dob: new Date("2000-02-11"),
       lastAppointment: new Date("2021-01-25"),
       nextAppointment: new Date("2021-03-27"),
       address: '155 South Freemont Road, Dallas, TX 75070',
       age: 21,
       height: 75,
       weight: 210,
       sex: 'Male',
       gender: 'Male',
       ethnicity: 'African-American',
       ReasonLastAppt: 'Lung tissue biopsy',
       ReasonNextAppt: 'Tumor removal',
       userId: 1234,
       patientId: 5467,
       appointmentId: 7777
     });}
else if (user.profile.userId == 5678){ 
  console.log('alternate doctor')
PatientsCollection.insert({lastName: 'Barrett',
       firstName: 'Jane',
       dob: new Date("2000-02-11"),
       lastAppointment: new Date("2021-01-25"),
       nextAppointment: new Date("2021-03-27"),
       address: '155 South Freemont Road, Dallas, TX 75070',
       age: 21,
       height: 75,
       weight: 210,
       sex: 'Male',
       gender: 'Male',
       ethnicity: 'African-American',
       ReasonLastAppt: 'Lung tissue biopsy',
       ReasonNextAppt: 'Tumor removal',
       userId: 5678,
       patientId: 5468,
       appointmentId: 8888
     });
PatientsCollection.insert({lastName: 'Blane',
       firstName: 'Joseph',
       dob: new Date("2000-02-11"),
       lastAppointment: new Date("2021-03-25"),
       nextAppointment: new Date("2021-04-27"),
       address: '155 North Freemont Road, Dallas, TX 75070',
       age: 21,
       height: 72,
       weight: 250,
       sex: 'Male',
       gender: 'Male',
       ethnicity: 'African-American',
       ReasonLastAppt: 'Lung tissue biopsy',
       ReasonNextAppt: 'Tumor removal',
       userId: 5678,
       patientId: 5469,
       appointmentId: 9999
     });
  }
  }
  }  */
    return(
    !user ?
      <div className="login-container">        
        <SignInOutContainer/>
        <LoginPageTopMenu/>
      </div> :
      <div>
        <Router>
            <Navbar/>
         <Switch>
          <Route path='/' exact component={Home}><PatientList /></Route>
          <Route path='/sessionsetup' component={PatientList}><PatientList /></Route>
          <Route path='/scheduledsessions' component={ScheduledSessions}><ScheduledSessions /></Route>
       </Switch>
       </Router>

          {user.profile.type === 'consultant' ?
            <Homepage_Constultant />
            :        
            <Homepage_Doctor />
          }
      </div>
  )
};

