'use strict';

var expect = require('chai').expect,
  workspace = require('../../lib/workspace'),
  nvcr = require('nock-vcr');



context('without any mock, using nock-vcr', function () {
  describe('#setup', function () {
    it('returns workspace information', function (done) {
      nvcr.insertCassette('setup');
      process.env.ALICE_NUMBER = '+551111111111';
      process.env.BOB_NUMBER = '+201111111111';
      process.env.HOST = 'https://ngrok.io';
      workspace.setup(function (err){done(err);}).then(function (data) {
        var workerInfo = data[0],
            workspaceInfo = data[1];
        expect(workspaceInfo.workspaceSid).to.be.equals('WS11566a021558d3ed28b54af8c4c7b857');
        expect(workspaceInfo.workflowSid).to.be.equals('WW98cc22847320360660d1de05dbe72c42');
        expect(workspaceInfo.activities.idle).to.be.equals('WAce62b8a472c363a49bd604f0d226cd8d');
        expect(workspaceInfo.activities.offline).to.be.equals('WAc30aec85a6ffe44693da7a0f84be5846');
        expect(workerInfo[process.env.ALICE_NUMBER]).to.be.equals('WKfd6a35e83f81e77d723894ce01c89091');
        expect(workerInfo[process.env.BOB_NUMBER]).to.be.equals('WK9d3cc6f1b18a93496b1d9768b25ba5e3');
        done();
      }).done();
    });
  });
});
