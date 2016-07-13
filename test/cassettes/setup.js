module.exports = exports = function(nock) {
var refs = [];

refs[0] = nock('http://taskrouter.twilio.com')
  .get('/v1/Workspaces')
  .reply(200, "{\"meta\": {\"page\": 0, \"page_size\": 50, \"first_page_url\": \"https://taskrouter.twilio.com/v1/Workspaces?PageSize=50&Page=0\", \"previous_page_url\": null, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces?PageSize=50&Page=0\", \"next_page_url\": null, \"key\": \"workspaces\"}, \"workspaces\": [{\"sid\": \"WS0844bde5a8e4d8cc1dc02cc4b36fb1a1\", \"account_sid\": \"account_sid\", \"friendly_name\": \"tutorial\", \"event_callback_url\": \"\", \"default_activity_sid\": \"WAde1dbe2a279ec64e2f91e82317c28af8\", \"date_created\": \"2016-05-30T14:50:43Z\", \"date_updated\": \"2016-05-30T15:20:56Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WAde1dbe2a279ec64e2f91e82317c28af8\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/TaskChannels\"}}, {\"sid\": \"WSeabdc584610d1c948f617019e1ee4c0f\", \"account_sid\": \"account_sid\", \"friendly_name\": \"My Workspace\", \"event_callback_url\": \"\", \"default_activity_sid\": \"WA5563557018800b678e1bd8946f13ce09\", \"date_created\": \"2016-06-27T16:58:25Z\", \"date_updated\": \"2016-06-27T16:58:25Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WA5563557018800b678e1bd8946f13ce09\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/TaskChannels\"}}, {\"sid\": \"WS14eebeef84865a8cdf70dd54f350f0e5\", \"account_sid\": \"account_sid\", \"friendly_name\": \"Twilio Workspace\", \"event_callback_url\": \"https://ec8459a1.ngrok.io/events\", \"default_activity_sid\": \"WA25f5cab19971f6aabe3540438fddb864\", \"date_created\": \"2016-07-12T21:28:45Z\", \"date_updated\": \"2016-07-12T21:28:45Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WA25f5cab19971f6aabe3540438fddb864\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/TaskChannels\"}}, {\"sid\": \"WScb68956ca300a2bad1c9f4f43926c328\", \"account_sid\": \"account_sid\", \"friendly_name\": \"TaskRouter Node Workspace\", \"event_callback_url\": \"https://ngrok.io/events\", \"default_activity_sid\": \"WA76de9c461a15fe3e90d2d0088fcd991e\", \"date_created\": \"2016-07-13T22:25:31Z\", \"date_updated\": \"2016-07-13T22:25:31Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WA76de9c461a15fe3e90d2d0088fcd991e\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/TaskChannels\"}}]}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:55 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.034',
  'twilio-request-id': 'RQdace92da15444f12b8d65c1357490d59',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '5655',
  connection: 'Close' });

refs[1] = nock('https://taskrouter.twilio.com')
  .get('/v1/Workspaces')
  .reply(200, "{\"meta\": {\"page\": 0, \"page_size\": 50, \"first_page_url\": \"https://taskrouter.twilio.com/v1/Workspaces?PageSize=50&Page=0\", \"previous_page_url\": null, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces?PageSize=50&Page=0\", \"next_page_url\": null, \"key\": \"workspaces\"}, \"workspaces\": [{\"sid\": \"WS0844bde5a8e4d8cc1dc02cc4b36fb1a1\", \"account_sid\": \"account_sid\", \"friendly_name\": \"tutorial\", \"event_callback_url\": \"\", \"default_activity_sid\": \"WAde1dbe2a279ec64e2f91e82317c28af8\", \"date_created\": \"2016-05-30T14:50:43Z\", \"date_updated\": \"2016-05-30T15:20:56Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WAde1dbe2a279ec64e2f91e82317c28af8\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS0844bde5a8e4d8cc1dc02cc4b36fb1a1/TaskChannels\"}}, {\"sid\": \"WSeabdc584610d1c948f617019e1ee4c0f\", \"account_sid\": \"account_sid\", \"friendly_name\": \"My Workspace\", \"event_callback_url\": \"\", \"default_activity_sid\": \"WA5563557018800b678e1bd8946f13ce09\", \"date_created\": \"2016-06-27T16:58:25Z\", \"date_updated\": \"2016-06-27T16:58:25Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WA5563557018800b678e1bd8946f13ce09\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WSeabdc584610d1c948f617019e1ee4c0f/TaskChannels\"}}, {\"sid\": \"WS14eebeef84865a8cdf70dd54f350f0e5\", \"account_sid\": \"account_sid\", \"friendly_name\": \"Twilio Workspace\", \"event_callback_url\": \"https://ec8459a1.ngrok.io/events\", \"default_activity_sid\": \"WA25f5cab19971f6aabe3540438fddb864\", \"date_created\": \"2016-07-12T21:28:45Z\", \"date_updated\": \"2016-07-12T21:28:45Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WA25f5cab19971f6aabe3540438fddb864\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS14eebeef84865a8cdf70dd54f350f0e5/TaskChannels\"}}, {\"sid\": \"WScb68956ca300a2bad1c9f4f43926c328\", \"account_sid\": \"account_sid\", \"friendly_name\": \"TaskRouter Node Workspace\", \"event_callback_url\": \"https://ngrok.io/events\", \"default_activity_sid\": \"WA76de9c461a15fe3e90d2d0088fcd991e\", \"date_created\": \"2016-07-13T22:25:31Z\", \"date_updated\": \"2016-07-13T22:25:31Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WA76de9c461a15fe3e90d2d0088fcd991e\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328/TaskChannels\"}}]}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:55 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.034',
  'twilio-request-id': 'RQdace92da15444f12b8d65c1357490d59',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '5655',
  connection: 'Close' });

refs[2] = nock('http://taskrouter.twilio.com')
  .delete('/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328')
  .reply(204, "", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-length': '0',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:56 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.056',
  'twilio-request-id': 'RQc3200544feeb4215a8ae0eff60c9400b',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  connection: 'Close' });

refs[3] = nock('https://taskrouter.twilio.com')
  .delete('/v1/Workspaces/WScb68956ca300a2bad1c9f4f43926c328')
  .reply(204, "", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-length': '0',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:56 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.056',
  'twilio-request-id': 'RQc3200544feeb4215a8ae0eff60c9400b',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  connection: 'Close' });

refs[4] = nock('http://taskrouter.twilio.com')
  .post('/v1/Workspaces', "FriendlyName=TaskRouter%20Node%20Workspace&EventCallbackUrl=https%3A%2F%2Fngrok.io%2Fevents")
  .reply(201, "{\"sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"account_sid\": \"account_sid\", \"friendly_name\": \"TaskRouter Node Workspace\", \"event_callback_url\": \"https://ngrok.io/events\", \"default_activity_sid\": \"WAc30aec85a6ffe44693da7a0f84be5846\", \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WAc30aec85a6ffe44693da7a0f84be5846\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskChannels\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:56 GMT',
  etag: '24205db0b5355f386fe6458f65d51722',
  'last-modified': '2016-07-13T22:25:56Z',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.064',
  'twilio-request-id': 'RQ4b1d998652bd4726962981ccda36afd8',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1367',
  connection: 'Close' });

refs[5] = nock('https://taskrouter.twilio.com')
  .post('/v1/Workspaces', "FriendlyName=TaskRouter%20Node%20Workspace&EventCallbackUrl=https%3A%2F%2Fngrok.io%2Fevents")
  .reply(201, "{\"sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"account_sid\": \"account_sid\", \"friendly_name\": \"TaskRouter Node Workspace\", \"event_callback_url\": \"https://ngrok.io/events\", \"default_activity_sid\": \"WAc30aec85a6ffe44693da7a0f84be5846\", \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"default_activity_name\": \"Offline\", \"timeout_activity_sid\": \"WAc30aec85a6ffe44693da7a0f84be5846\", \"timeout_activity_name\": \"Offline\", \"events_filter\": null, \"multi_task_enabled\": false, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\", \"links\": {\"activities\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities\", \"task_queues\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues\", \"statistics\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Statistics\", \"tasks\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Tasks\", \"workers\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers\", \"workflows\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workflows\", \"task_channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskChannels\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:56 GMT',
  etag: '24205db0b5355f386fe6458f65d51722',
  'last-modified': '2016-07-13T22:25:56Z',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.064',
  'twilio-request-id': 'RQ4b1d998652bd4726962981ccda36afd8',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1367',
  connection: 'Close' });

refs[6] = nock('http://taskrouter.twilio.com')
  .get('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities')
  .reply(200, "{\"activities\": [{\"sid\": \"WAc30aec85a6ffe44693da7a0f84be5846\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Offline\", \"available\": false, \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAc30aec85a6ffe44693da7a0f84be5846\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}, {\"sid\": \"WAce62b8a472c363a49bd604f0d226cd8d\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Idle\", \"available\": true, \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAce62b8a472c363a49bd604f0d226cd8d\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}, {\"sid\": \"WAe26433bd3faf1fe6a63b9b574aade82d\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Busy\", \"available\": false, \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAe26433bd3faf1fe6a63b9b574aade82d\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}, {\"sid\": \"WA4e31000ada5cd0c98163fb3a612488fe\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Reserved\", \"available\": false, \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WA4e31000ada5cd0c98163fb3a612488fe\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}], \"meta\": {\"page\": 0, \"page_size\": 50, \"first_page_url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities?PageSize=50&Page=0\", \"previous_page_url\": null, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities?PageSize=50&Page=0\", \"next_page_url\": null, \"key\": \"activities\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:57 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.024',
  'twilio-request-id': 'RQ5e3e32f6dcfa44e8886268877cdf776b',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '2464',
  connection: 'Close' });

refs[7] = nock('https://taskrouter.twilio.com')
  .get('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities')
  .reply(200, "{\"activities\": [{\"sid\": \"WAc30aec85a6ffe44693da7a0f84be5846\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Offline\", \"available\": false, \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAc30aec85a6ffe44693da7a0f84be5846\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}, {\"sid\": \"WAce62b8a472c363a49bd604f0d226cd8d\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Idle\", \"available\": true, \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAce62b8a472c363a49bd604f0d226cd8d\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}, {\"sid\": \"WAe26433bd3faf1fe6a63b9b574aade82d\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Busy\", \"available\": false, \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAe26433bd3faf1fe6a63b9b574aade82d\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}, {\"sid\": \"WA4e31000ada5cd0c98163fb3a612488fe\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Reserved\", \"available\": false, \"date_created\": \"2016-07-13T22:25:56Z\", \"date_updated\": \"2016-07-13T22:25:56Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WA4e31000ada5cd0c98163fb3a612488fe\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}], \"meta\": {\"page\": 0, \"page_size\": 50, \"first_page_url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities?PageSize=50&Page=0\", \"previous_page_url\": null, \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities?PageSize=50&Page=0\", \"next_page_url\": null, \"key\": \"activities\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:57 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.024',
  'twilio-request-id': 'RQ5e3e32f6dcfa44e8886268877cdf776b',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '2464',
  connection: 'Close' });

refs[8] = nock('http://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues', "FriendlyName=SMS&TargetWorkers=products%20HAS%20%22ProgrammableSMS%22&AssignmentActivitySid=WAe26433bd3faf1fe6a63b9b574aade82d&ReservationActivitySid=WA4e31000ada5cd0c98163fb3a612488fe")
  .reply(201, "{\"sid\": \"WQb0976da2e3fe2a33031ed82340d9472a\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"SMS\", \"target_workers\": \"products HAS \\\"ProgrammableSMS\\\"\", \"max_reserved_workers\": 1, \"reservation_activity_sid\": \"WA4e31000ada5cd0c98163fb3a612488fe\", \"reservation_activity_name\": \"Reserved\", \"assignment_activity_sid\": \"WAe26433bd3faf1fe6a63b9b574aade82d\", \"assignment_activity_name\": \"Busy\", \"date_created\": \"2016-07-13T22:25:58Z\", \"date_updated\": \"2016-07-13T22:25:58Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues/WQb0976da2e3fe2a33031ed82340d9472a\", \"links\": {\"assignment_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAe26433bd3faf1fe6a63b9b574aade82d\", \"reservation_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WA4e31000ada5cd0c98163fb3a612488fe\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.057',
  'twilio-request-id': 'RQ4b1604b7d8d9406e97297cab379f13fb',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1090',
  connection: 'Close' });

refs[9] = nock('https://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues', "FriendlyName=SMS&TargetWorkers=products%20HAS%20%22ProgrammableSMS%22&AssignmentActivitySid=WAe26433bd3faf1fe6a63b9b574aade82d&ReservationActivitySid=WA4e31000ada5cd0c98163fb3a612488fe")
  .reply(201, "{\"sid\": \"WQb0976da2e3fe2a33031ed82340d9472a\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"SMS\", \"target_workers\": \"products HAS \\\"ProgrammableSMS\\\"\", \"max_reserved_workers\": 1, \"reservation_activity_sid\": \"WA4e31000ada5cd0c98163fb3a612488fe\", \"reservation_activity_name\": \"Reserved\", \"assignment_activity_sid\": \"WAe26433bd3faf1fe6a63b9b574aade82d\", \"assignment_activity_name\": \"Busy\", \"date_created\": \"2016-07-13T22:25:58Z\", \"date_updated\": \"2016-07-13T22:25:58Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues/WQb0976da2e3fe2a33031ed82340d9472a\", \"links\": {\"assignment_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAe26433bd3faf1fe6a63b9b574aade82d\", \"reservation_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WA4e31000ada5cd0c98163fb3a612488fe\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.057',
  'twilio-request-id': 'RQ4b1604b7d8d9406e97297cab379f13fb',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1090',
  connection: 'Close' });

refs[10] = nock('http://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues', "FriendlyName=Default&TargetWorkers=1%3D%3D1&AssignmentActivitySid=WAe26433bd3faf1fe6a63b9b574aade82d&ReservationActivitySid=WA4e31000ada5cd0c98163fb3a612488fe")
  .reply(201, "{\"sid\": \"WQf5b5a389e5319c3647fc01cdc5c87c4c\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Default\", \"target_workers\": \"1==1\", \"max_reserved_workers\": 1, \"reservation_activity_sid\": \"WA4e31000ada5cd0c98163fb3a612488fe\", \"reservation_activity_name\": \"Reserved\", \"assignment_activity_sid\": \"WAe26433bd3faf1fe6a63b9b574aade82d\", \"assignment_activity_name\": \"Busy\", \"date_created\": \"2016-07-13T22:25:58Z\", \"date_updated\": \"2016-07-13T22:25:58Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues/WQf5b5a389e5319c3647fc01cdc5c87c4c\", \"links\": {\"assignment_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAe26433bd3faf1fe6a63b9b574aade82d\", \"reservation_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WA4e31000ada5cd0c98163fb3a612488fe\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.029',
  'twilio-request-id': 'RQ67f0a6476aaf45da86ab6134edcdfc03',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1066',
  connection: 'Close' });

refs[11] = nock('https://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues', "FriendlyName=Default&TargetWorkers=1%3D%3D1&AssignmentActivitySid=WAe26433bd3faf1fe6a63b9b574aade82d&ReservationActivitySid=WA4e31000ada5cd0c98163fb3a612488fe")
  .reply(201, "{\"sid\": \"WQf5b5a389e5319c3647fc01cdc5c87c4c\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Default\", \"target_workers\": \"1==1\", \"max_reserved_workers\": 1, \"reservation_activity_sid\": \"WA4e31000ada5cd0c98163fb3a612488fe\", \"reservation_activity_name\": \"Reserved\", \"assignment_activity_sid\": \"WAe26433bd3faf1fe6a63b9b574aade82d\", \"assignment_activity_name\": \"Busy\", \"date_created\": \"2016-07-13T22:25:58Z\", \"date_updated\": \"2016-07-13T22:25:58Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues/WQf5b5a389e5319c3647fc01cdc5c87c4c\", \"links\": {\"assignment_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAe26433bd3faf1fe6a63b9b574aade82d\", \"reservation_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WA4e31000ada5cd0c98163fb3a612488fe\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.029',
  'twilio-request-id': 'RQ67f0a6476aaf45da86ab6134edcdfc03',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1066',
  connection: 'Close' });

refs[12] = nock('http://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers', "FriendlyName=Alice&Attributes=%7B%22products%22%3A%5B%22ProgrammableVoice%22%5D%2C%22contact_uri%22%3A%22%2B551111111111%22%7D&ActivitySid=WAce62b8a472c363a49bd604f0d226cd8d")
  .reply(201, "{\"sid\": \"WKfd6a35e83f81e77d723894ce01c89091\", \"friendly_name\": \"Alice\", \"account_sid\": \"account_sid\", \"activity_sid\": \"WAce62b8a472c363a49bd604f0d226cd8d\", \"activity_name\": \"Idle\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"attributes\": \"{\\\"contact_uri\\\":\\\"+551111111111\\\",\\\"products\\\":[\\\"ProgrammableVoice\\\"]}\", \"available\": true, \"date_created\": \"2016-07-13T22:25:57Z\", \"date_updated\": \"2016-07-13T22:25:57Z\", \"date_status_changed\": \"2016-07-13T22:25:57Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers/WKfd6a35e83f81e77d723894ce01c89091\", \"links\": {\"channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers/WKfd6a35e83f81e77d723894ce01c89091/Channels\", \"activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAce62b8a472c363a49bd604f0d226cd8d\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.058',
  'twilio-request-id': 'RQ6d4e3c8bb93a4825bac63a6896003fbf',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1019',
  connection: 'Close' });

refs[13] = nock('https://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers', "FriendlyName=Alice&Attributes=%7B%22products%22%3A%5B%22ProgrammableVoice%22%5D%2C%22contact_uri%22%3A%22%2B551111111111%22%7D&ActivitySid=WAce62b8a472c363a49bd604f0d226cd8d")
  .reply(201, "{\"sid\": \"WKfd6a35e83f81e77d723894ce01c89091\", \"friendly_name\": \"Alice\", \"account_sid\": \"account_sid\", \"activity_sid\": \"WAce62b8a472c363a49bd604f0d226cd8d\", \"activity_name\": \"Idle\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"attributes\": \"{\\\"contact_uri\\\":\\\"+551111111111\\\",\\\"products\\\":[\\\"ProgrammableVoice\\\"]}\", \"available\": true, \"date_created\": \"2016-07-13T22:25:57Z\", \"date_updated\": \"2016-07-13T22:25:57Z\", \"date_status_changed\": \"2016-07-13T22:25:57Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers/WKfd6a35e83f81e77d723894ce01c89091\", \"links\": {\"channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers/WKfd6a35e83f81e77d723894ce01c89091/Channels\", \"activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAce62b8a472c363a49bd604f0d226cd8d\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.058',
  'twilio-request-id': 'RQ6d4e3c8bb93a4825bac63a6896003fbf',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1019',
  connection: 'Close' });

refs[14] = nock('http://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers', "FriendlyName=Bob&Attributes=%7B%22products%22%3A%5B%22ProgrammableSMS%22%5D%2C%22contact_uri%22%3A%22%2B201111111111%22%7D&ActivitySid=WAce62b8a472c363a49bd604f0d226cd8d")
  .reply(201, "{\"sid\": \"WK9d3cc6f1b18a93496b1d9768b25ba5e3\", \"friendly_name\": \"Bob\", \"account_sid\": \"account_sid\", \"activity_sid\": \"WAce62b8a472c363a49bd604f0d226cd8d\", \"activity_name\": \"Idle\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"attributes\": \"{\\\"contact_uri\\\":\\\"+201111111111\\\",\\\"products\\\":[\\\"ProgrammableSMS\\\"]}\", \"available\": true, \"date_created\": \"2016-07-13T22:25:57Z\", \"date_updated\": \"2016-07-13T22:25:57Z\", \"date_status_changed\": \"2016-07-13T22:25:57Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers/WK9d3cc6f1b18a93496b1d9768b25ba5e3\", \"links\": {\"channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers/WK9d3cc6f1b18a93496b1d9768b25ba5e3/Channels\", \"activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAce62b8a472c363a49bd604f0d226cd8d\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:57 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.061',
  'twilio-request-id': 'RQ9a9c890d846e4eb38784a009417acfa4',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1013',
  connection: 'Close' });

refs[15] = nock('https://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers', "FriendlyName=Bob&Attributes=%7B%22products%22%3A%5B%22ProgrammableSMS%22%5D%2C%22contact_uri%22%3A%22%2B201111111111%22%7D&ActivitySid=WAce62b8a472c363a49bd604f0d226cd8d")
  .reply(201, "{\"sid\": \"WK9d3cc6f1b18a93496b1d9768b25ba5e3\", \"friendly_name\": \"Bob\", \"account_sid\": \"account_sid\", \"activity_sid\": \"WAce62b8a472c363a49bd604f0d226cd8d\", \"activity_name\": \"Idle\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"attributes\": \"{\\\"contact_uri\\\":\\\"+201111111111\\\",\\\"products\\\":[\\\"ProgrammableSMS\\\"]}\", \"available\": true, \"date_created\": \"2016-07-13T22:25:57Z\", \"date_updated\": \"2016-07-13T22:25:57Z\", \"date_status_changed\": \"2016-07-13T22:25:57Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers/WK9d3cc6f1b18a93496b1d9768b25ba5e3\", \"links\": {\"channels\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workers/WK9d3cc6f1b18a93496b1d9768b25ba5e3/Channels\", \"activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAce62b8a472c363a49bd604f0d226cd8d\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:57 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.061',
  'twilio-request-id': 'RQ9a9c890d846e4eb38784a009417acfa4',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1013',
  connection: 'Close' });

refs[16] = nock('http://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues', "FriendlyName=Voice&TargetWorkers=products%20HAS%20%22ProgrammableVoice%22&AssignmentActivitySid=WAe26433bd3faf1fe6a63b9b574aade82d&ReservationActivitySid=WA4e31000ada5cd0c98163fb3a612488fe")
  .reply(201, "{\"sid\": \"WQ0a0a94834e9efc578f8f343250369349\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Voice\", \"target_workers\": \"products HAS \\\"ProgrammableVoice\\\"\", \"max_reserved_workers\": 1, \"reservation_activity_sid\": \"WA4e31000ada5cd0c98163fb3a612488fe\", \"reservation_activity_name\": \"Reserved\", \"assignment_activity_sid\": \"WAe26433bd3faf1fe6a63b9b574aade82d\", \"assignment_activity_name\": \"Busy\", \"date_created\": \"2016-07-13T22:25:58Z\", \"date_updated\": \"2016-07-13T22:25:58Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues/WQ0a0a94834e9efc578f8f343250369349\", \"links\": {\"assignment_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAe26433bd3faf1fe6a63b9b574aade82d\", \"reservation_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WA4e31000ada5cd0c98163fb3a612488fe\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.037',
  'twilio-request-id': 'RQafa88458fb9e4b5ab116b6b671eeb865',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1094',
  connection: 'Close' });

refs[17] = nock('https://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues', "FriendlyName=Voice&TargetWorkers=products%20HAS%20%22ProgrammableVoice%22&AssignmentActivitySid=WAe26433bd3faf1fe6a63b9b574aade82d&ReservationActivitySid=WA4e31000ada5cd0c98163fb3a612488fe")
  .reply(201, "{\"sid\": \"WQ0a0a94834e9efc578f8f343250369349\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"friendly_name\": \"Voice\", \"target_workers\": \"products HAS \\\"ProgrammableVoice\\\"\", \"max_reserved_workers\": 1, \"reservation_activity_sid\": \"WA4e31000ada5cd0c98163fb3a612488fe\", \"reservation_activity_name\": \"Reserved\", \"assignment_activity_sid\": \"WAe26433bd3faf1fe6a63b9b574aade82d\", \"assignment_activity_name\": \"Busy\", \"date_created\": \"2016-07-13T22:25:58Z\", \"date_updated\": \"2016-07-13T22:25:58Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/TaskQueues/WQ0a0a94834e9efc578f8f343250369349\", \"links\": {\"assignment_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WAe26433bd3faf1fe6a63b9b574aade82d\", \"reservation_activity\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Activities/WA4e31000ada5cd0c98163fb3a612488fe\", \"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.037',
  'twilio-request-id': 'RQafa88458fb9e4b5ab116b6b671eeb865',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1094',
  connection: 'Close' });

refs[18] = nock('http://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workflows', "FriendlyName=Sales&AssignmentCallbackUrl=https%3A%2F%2Fngrok.io%2Fcall%2Fassignment&FallbackAssignmentCallbackUrl=https%3A%2F%2Fngrok.io%2Fcall%2Fassignment&TaskReservationTimeout=15&Configuration=%7B%22task_routing%22%3A%7B%22filters%22%3A%5B%7B%22expression%22%3A%22selected_product%3D%3D%5C%22ProgrammableSMS%5C%22%22%2C%22targets%22%3A%5B%7B%22queue%22%3A%22WQb0976da2e3fe2a33031ed82340d9472a%22%2C%22priority%22%3A5%2C%22timeout%22%3A30%7D%2C%7B%22queue%22%3A%22WQf5b5a389e5319c3647fc01cdc5c87c4c%22%2C%22priority%22%3A1%2C%22timeout%22%3A30%7D%5D%7D%2C%7B%22expression%22%3A%22selected_product%3D%3D%5C%22ProgrammableVoice%5C%22%22%2C%22targets%22%3A%5B%7B%22queue%22%3A%22WQ0a0a94834e9efc578f8f343250369349%22%2C%22priority%22%3A5%2C%22timeout%22%3A30%7D%2C%7B%22queue%22%3A%22WQf5b5a389e5319c3647fc01cdc5c87c4c%22%2C%22priority%22%3A1%2C%22timeout%22%3A30%7D%5D%7D%5D%2C%22default_filter%22%3A%7B%22queue%22%3A%22WQf5b5a389e5319c3647fc01cdc5c87c4c%22%2C%22priority%22%3A1%2C%22timeout%22%3A30%7D%7D%7D")
  .reply(201, "{\"sid\": \"WW98cc22847320360660d1de05dbe72c42\", \"friendly_name\": \"Sales\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"assignment_callback_url\": \"https://ngrok.io/call/assignment\", \"fallback_assignment_callback_url\": \"https://ngrok.io/call/assignment\", \"document_content_type\": null, \"configuration\": \"{\\\"task_routing\\\":{\\\"filters\\\":[{\\\"expression\\\":\\\"selected_product==\\\\\\\"ProgrammableSMS\\\\\\\"\\\",\\\"targets\\\":[{\\\"queue\\\":\\\"WQb0976da2e3fe2a33031ed82340d9472a\\\",\\\"priority\\\":5,\\\"timeout\\\":30},{\\\"queue\\\":\\\"WQf5b5a389e5319c3647fc01cdc5c87c4c\\\",\\\"priority\\\":1,\\\"timeout\\\":30}]},{\\\"expression\\\":\\\"selected_product==\\\\\\\"ProgrammableVoice\\\\\\\"\\\",\\\"targets\\\":[{\\\"queue\\\":\\\"WQ0a0a94834e9efc578f8f343250369349\\\",\\\"priority\\\":5,\\\"timeout\\\":30},{\\\"queue\\\":\\\"WQf5b5a389e5319c3647fc01cdc5c87c4c\\\",\\\"priority\\\":1,\\\"timeout\\\":30}]}],\\\"default_filter\\\":{\\\"queue\\\":\\\"WQf5b5a389e5319c3647fc01cdc5c87c4c\\\",\\\"priority\\\":1,\\\"timeout\\\":30}}}\", \"task_reservation_timeout\": 15, \"date_created\": \"2016-07-13T22:25:58Z\", \"date_updated\": \"2016-07-13T22:25:58Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workflows/WW98cc22847320360660d1de05dbe72c42\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.061',
  'twilio-request-id': 'RQ66d29068b3d5432383192475b7293ee4',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1350',
  connection: 'Close' });

refs[19] = nock('https://taskrouter.twilio.com')
  .post('/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workflows', "FriendlyName=Sales&AssignmentCallbackUrl=https%3A%2F%2Fngrok.io%2Fcall%2Fassignment&FallbackAssignmentCallbackUrl=https%3A%2F%2Fngrok.io%2Fcall%2Fassignment&TaskReservationTimeout=15&Configuration=%7B%22task_routing%22%3A%7B%22filters%22%3A%5B%7B%22expression%22%3A%22selected_product%3D%3D%5C%22ProgrammableSMS%5C%22%22%2C%22targets%22%3A%5B%7B%22queue%22%3A%22WQb0976da2e3fe2a33031ed82340d9472a%22%2C%22priority%22%3A5%2C%22timeout%22%3A30%7D%2C%7B%22queue%22%3A%22WQf5b5a389e5319c3647fc01cdc5c87c4c%22%2C%22priority%22%3A1%2C%22timeout%22%3A30%7D%5D%7D%2C%7B%22expression%22%3A%22selected_product%3D%3D%5C%22ProgrammableVoice%5C%22%22%2C%22targets%22%3A%5B%7B%22queue%22%3A%22WQ0a0a94834e9efc578f8f343250369349%22%2C%22priority%22%3A5%2C%22timeout%22%3A30%7D%2C%7B%22queue%22%3A%22WQf5b5a389e5319c3647fc01cdc5c87c4c%22%2C%22priority%22%3A1%2C%22timeout%22%3A30%7D%5D%7D%5D%2C%22default_filter%22%3A%7B%22queue%22%3A%22WQf5b5a389e5319c3647fc01cdc5c87c4c%22%2C%22priority%22%3A1%2C%22timeout%22%3A30%7D%7D%7D")
  .reply(201, "{\"sid\": \"WW98cc22847320360660d1de05dbe72c42\", \"friendly_name\": \"Sales\", \"account_sid\": \"account_sid\", \"workspace_sid\": \"WS11566a021558d3ed28b54af8c4c7b857\", \"assignment_callback_url\": \"https://ngrok.io/call/assignment\", \"fallback_assignment_callback_url\": \"https://ngrok.io/call/assignment\", \"document_content_type\": null, \"configuration\": \"{\\\"task_routing\\\":{\\\"filters\\\":[{\\\"expression\\\":\\\"selected_product==\\\\\\\"ProgrammableSMS\\\\\\\"\\\",\\\"targets\\\":[{\\\"queue\\\":\\\"WQb0976da2e3fe2a33031ed82340d9472a\\\",\\\"priority\\\":5,\\\"timeout\\\":30},{\\\"queue\\\":\\\"WQf5b5a389e5319c3647fc01cdc5c87c4c\\\",\\\"priority\\\":1,\\\"timeout\\\":30}]},{\\\"expression\\\":\\\"selected_product==\\\\\\\"ProgrammableVoice\\\\\\\"\\\",\\\"targets\\\":[{\\\"queue\\\":\\\"WQ0a0a94834e9efc578f8f343250369349\\\",\\\"priority\\\":5,\\\"timeout\\\":30},{\\\"queue\\\":\\\"WQf5b5a389e5319c3647fc01cdc5c87c4c\\\",\\\"priority\\\":1,\\\"timeout\\\":30}]}],\\\"default_filter\\\":{\\\"queue\\\":\\\"WQf5b5a389e5319c3647fc01cdc5c87c4c\\\",\\\"priority\\\":1,\\\"timeout\\\":30}}}\", \"task_reservation_timeout\": 15, \"date_created\": \"2016-07-13T22:25:58Z\", \"date_updated\": \"2016-07-13T22:25:58Z\", \"url\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857/Workflows/WW98cc22847320360660d1de05dbe72c42\", \"links\": {\"workspace\": \"https://taskrouter.twilio.com/v1/Workspaces/WS11566a021558d3ed28b54af8c4c7b857\"}}", { 'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-type': 'application/json; charset=utf-8',
  date: 'Wed, 13 Jul 2016 22:25:58 GMT',
  'strict-transport-security': 'max-age=15768000',
  'twilio-request-duration': '0.061',
  'twilio-request-id': 'RQ66d29068b3d5432383192475b7293ee4',
  'x-powered-by': 'AT-5000',
  'x-shenanigans': 'none',
  'content-length': '1350',
  connection: 'Close' });


return refs;
};
