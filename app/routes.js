// Load environment variables from .env file
require('dotenv').config();
const NotifyClient = require('notifications-node-client').NotifyClient;

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.post('/email-address-page', (req, res) => {
	const notify = new NotifyClient(process.env.NOTIFYAPIKEY);
	notify.sendEmail(
		'e571db62-1c28-4d43-990b-ad856dd47bbf',
		req.body.emailAddress
	)

	res.redirect('/confirmation-page');
})



// Define route for randomly redirecting to child-facing-A or child-facing-B
router.post('/child-facing', (req, res) => {
    // Randomly choose between /child-facing-A and /child-facing-B
    const nextPage = Math.random() < 0.5 ? '/child-facing-A' : '/child-facing-B';
    // Redirect to the randomly chosen page
    return res.redirect(nextPage);
});

// Define route for child-facing-A
router.get('/child-facing-A', (req, res) => {
    // Render the child-facing-A page
    res.render('child-facing-A');
});

// Define route for child-facing-B
router.get('/child-facing-B', (req, res) => {
    // Render the child-facing-B page
    res.render('child-facing-B');
});

// Define route for /returner-A
router.get('/returner-A', (req, res) => {
    // Render the returner-A page
    res.render('returner-A');
});

  
const express = require('express');
const notifyClient = new NotifyClient('your-notify-api-key');

router.post('/email-address-page', async (req, res) => { // Make this function async
  const emailAddress = req.body.email;
  const templateId = 'your-template-id';

  try {
    const response = await notifyClient.sendEmail(templateId, emailAddress, {}); // Use await inside async function
    console.log('Email sent successfully:', response);
    res.redirect('/success-page');
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).send('An error occurred while sending the email.');
  }
});


module.exports = router;  // Export the router at the end of the file
