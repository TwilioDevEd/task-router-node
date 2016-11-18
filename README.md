<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Task Router - NodeJS/Express

[![Build Status](https://travis-ci.org/TwilioDevEd/task-router-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/task-router-node)

Increase your rate of response by automating the workflows that are key to your business. In this tutorial, learn how to build a ready-for-scale automated SMS workflow, for a vacation rental company.

[Read the full tutorial here](https://www.twilio.com/docs/tutorials/walkthrough/dynamic-call-center/node/express)

### Prerequisites
  First you need to install
  - [Node.js](http://nodejs.org/) which should also install [npm](https://www.npmjs.com/).
  - [MongoDB](https://www.mongodb.org/)

### Create a TwiML App

  This project is configured to use a **TwiML App**, which allows us to easily set the voice URLs for all Twilio phone numbers we purchase in this app.

  [Create a new TwiML app](https://www.twilio.com/console/phone-numbers/dev-tools/twiml-apps/add) and use its `Sid` as the `TWILIO_APP_SID` environment variable wherever you run this app.

  ![Creating a TwiML App](http://howtodocs.s3.amazonaws.com/call-tracking-twiml-app.gif)

  See the end of the "Local development" section for details on the exact URL to use in your TwiML app.

  Once you have created your TwiML app, [configure your Twilio phone number](https://www.twilio.com/help/faq/twilio-client/how-do-i-create-a-twiml-app). If you don't have a Twilio phone number yet, you can purchase a new number in your [Twilio Account Dashboard](https://www.twilio.com/console/phone-numbers/search).

### Local Development

1. First clone this repository and `cd` into it.

  ```bash
  $ git clone git@github.com:TwilioDevEd/task-router-node.git
  $ cd task-router-node
  ```

1. Copy the sample configuration file and edit it to match your configuration
  ```bash
  $ cp .env.example .env
  ```
  You can find your `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` in your
  [Twilio Account Settings](https://www.twilio.com/console).
  You will also need a `TWILIO_PHONE_NUMBER`, which you may find [here](https://www.twilio.com/console/phone-numbers/incoming).

  Run `source .env` to export the environment variables

1. Install dependencies.

  ```bash
  $ npm install
  ```

1. Make sure the tests succeed.

  ```bash
  $ npm test
  ```

1. Run the application.

  ```bash
  $ npm start
  ```

1. Expose your local web server to the internet using ngrok.

  You can click [here](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html)
  for more details. This step is important because the application won't
  work as expected if you run it using `localhost`.

  ```bash
  $ ngrok http 3000
  ```

  Once ngrok is running open up your browser and go to your ngrok URL. It will look something like this:

  `http://<sub-domain>.ngrok.io/`

1. Configure Twilio to call your webhooks.

  You will also need to configure Twilio to call your application via POST when
  phone calls are received on your _Twilio Number_. The configuration of
  **Voice** should look something like this:

  ```
  http://<sub-domain>.ngrok.io/call/incoming
  ```

  The configuration for **Messaging** should look like this:

  ```
  http://<sub-domain>.ngrok.io/sms/incoming
  ```

  ![Configuring](http://howtodocs.s3.amazonaws.com/twilio-number-config-all-med.gif)

## How to Demo

1. When you run the app, a new workspace will be configured. Once that is done,
   you are ready to call your [Twilio Number](https://www.twilio.com/console/phone-numbers/incoming)
   where you'll be asked to select a product using your key pad.

1. Select an option and the phone assigned to the product you selected (Bob or Alice's)
   will start ringing. You can answer the call and have a conversation.

1. Alternatively, if you don't answer the call within 15 seconds, the call should be
   redirected to the next worker. If the call isn't answered by the second worker,
   you should be redirected to voice mail and leave a message. The transcription
   of that message should be sent to the email you specified in your environment variables.

1. Each time a worker misses a call, their activity is changed to offline. Right after they
   should receive a notification, via SMS, saying that they missed the call. In order to go
   back online they can reply with `On`. They can as well reply with `Off` in order
   to go back to offline status.

1. If both workers' activity changes to `Offline` and you call your Twilio Number again,
   you should be redirected to voice mail after a few seconds as the workflow timeouts
   when there are no available workers. Change your workers status with the `On`
   SMS command to be able to receive calls again.

1. Navigate to `https://<ngrok_subdomain>.ngrok.io` to see a list of the missed calls.

[twilio-phone-number]: https://www.twilio.com/console/phone-numbers/incoming

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
