#!/usr/bin/env node
"use strict";

var program = require('commander');

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
