import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const PatientsCollection = new Mongo.Collection('patients');

PatientsCollection.schema = new SimpleSchema({
    lastName: {type: String},
    firstName: {type: String},
    dob: {type: Date},
    lastAppointment: {type: Date},
    nextAppointment: {type: Date},
    address: {type: String},
    age: {type: Number},
    height: {type: Number}, //inches
    weight: {type: Number}, //pounds
    sex: {type: String},
    gender: {type: String},
    ethnicity: {type: String},
    ReasonLastAppt: {type: String},
    ReasonNextAppt: {type: String},
    userId: {type: Number},
    patientId: {type: Number},
    appointmentId: {type: Number}

});
