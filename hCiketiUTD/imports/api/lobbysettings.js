
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const LobbySettingsCollection = new Mongo.Collection('lobbysettings');

LobbySettingsCollection.schema = new SimpleSchema({
    sessionId: {type: String}, 
    userId: {type: Number},   
    cameraId:  {type: String}, 
    microphoneId: {type: String}, 
    chromaKey : {type: String},  
    chromaLevel: {type: String}   
});
