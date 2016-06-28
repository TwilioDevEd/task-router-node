#!/usr/bin/env node
"use strict";

var program   = require('commander'),
    workspaceHelper = require('./lib/workspace'),
    util = require('util'),
    fs = require('fs');

var hostValue, bobNumberValue, aliceNumberValue;

program
  .version('0.0.1')
  .arguments('<host> <bob_number> <alice_number>')
  .description('Creates and configures a Twilio\'s TaskRouter Workspace.')
  .action(function (host, bobNumber, aliceNumber){
    hostValue        = host;
    bobNumberValue   = bobNumber;
    aliceNumberValue = aliceNumber;
  });

program.parse(process.argv);

if(!hostValue || !bobNumberValue || !aliceNumberValue){
  program.outputHelp();
  process.exit(1);
}

function exitErrorHandler(error) {
  console.error('Error while creating workspace:');
  console.error(error);
  process.exit(1);
}
var workspaceJson = JSON.parse(fs.readFileSync('workspace.json', 'utf8'));

workspaceHelper.deleteByName(workspaceJson.name).then(function(){
  var eventCallback = util.format(workspaceJson.event_callback, hostValue);
  console.log(eventCallback);
  return workspaceHelper.create(workspaceJson.name, eventCallback).then(function(workspaceWrapper){
    console.log(workspaceWrapper);
  }).catch(exitErrorHandler);
}).catch(exitErrorHandler);
