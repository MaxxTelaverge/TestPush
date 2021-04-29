import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const SessionsCollection = new Mongo.Collection('sessions');

SessionsCollection.schema = new SimpleSchema({

    appointmentId: {type: Number,optional: false},
    meetingDuration: {type: Number,optional: false},
    sessionStatus: {type: String},  
    roomId: {type: String},  
    consultantUserId: {type: Number,optional: false},
    consultantSpecialization: {type: String,optional: false},
    notesForSession: {type: String,optional: false},
});
