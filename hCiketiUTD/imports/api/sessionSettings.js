import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const SessionSettingsCollection = new Mongo.Collection('sessionSettings');

SessionSettingsCollection.schema = new SimpleSchema({
    sessionID: {type: String},
    userID: {type: String},
    cameraSelction: {type: String},
    audioSelection: {type: String},
    ckLevel: {type: Number},
    ckHexValue: {type: String},
});