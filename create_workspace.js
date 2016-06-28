#!/usr/bin/env node
"use strict";

var program   = require('commander'),
    workspace = require('./lib/workspace');

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

workspace.deleteByName('Twilio Workspace').then(function(){
  return workspace.create('Twilio Workspace', hostValue + '/events').then(function(workspaceWrapper){
    console.log(workspaceWrapper);
  }).catch(exitErrorHandler);
}).catch(exitErrorHandler);
