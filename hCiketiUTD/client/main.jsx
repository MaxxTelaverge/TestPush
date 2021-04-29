import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import 'bootstrap/dist/css/bootstrap.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


Meteor.startup(() => {
  
 render(<App/>, document.getElementById('react-target'));
});
