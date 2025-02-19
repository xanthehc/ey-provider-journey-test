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

router.post('/expired-email-address-page', (req, res) => {
	const notify = new NotifyClient(process.env.NOTIFYAPIKEY);
	notify.sendEmail(
		'2452fdf4-d32e-48f9-b60c-06ac52d7f662',
		req.body.emailAddress
	)

	res.redirect('/confirmation-page');
})



router.post('/test', function(request, response) {
  // Assuming session data is set properly with declaration-B
  var declarationB = request.session.data['declarationB'];

  if (declarationB === "yes") {
      response.redirect("/returner-1");
  } else {
      response.redirect("/ineligible");
  }
});

// Route to handle form submission from /child-facing-A
router.post('/child-facing-A', function(request, response) {
  // Always redirect to /returner-1
  response.redirect("/returner-1");
});

// Route to handle form submission from /returner-1
router.post('/returner-1', function(request, response) {
  // Get the value of the radio buttons
  var returnerOne = request.body.returnerOne;

  // Redirect based on the radio button value
  if (returnerOne === "no") {
      response.redirect("/employee-email");
  } else {
      response.redirect("/returner-2");
  }
});


router.post('/returner-2', function(request, response) {
  // Assuming session data is set properly with returnerOne
  var returnerTwo = request.session.data['returnerTwo'];

  if (returnerTwo === "yes") {
      response.redirect("/returner-4B");
  } 
  else {
      response.redirect("/employee-email");
  }
});


router.post('/returner-4A', function(request, response) {
  // Assuming session data is set properly with returnerOne
  var returnerThree = request.session.data['returnerThree'];

  if (returnerThree === "no") {
      response.redirect("/ineligible");
  }
  else {
      response.redirect("/employee-email");
  }
});

router.post('/returner-4B', function(request, response) {
  var returnerFour = request.body.returnerFour;

  if (returnerFour === "permanent") {
      response.redirect("/ineligible");
  } else {
      response.redirect("/employee-email");
  }
});

router.post('/current-school-playback', function (request, response) {
  var currentSchool = request.body.currentSchool; // Corrected form field name

  if (currentSchool === "true") {  // Correctly checking for the "true" string
      response.redirect("/paye-reference");
  } else if (currentSchool === "none-of-the-above") {
      response.redirect("/ineligible-nursery");
  } else {
      response.redirect("/current-school-playback"); // Redirect back if nothing is selected
  }
});

// Check answers page GET request
router.get('/check-answers', function (req, res) {
  res.render('check-answers');
});

router.post('/email-address', function (req, res) {
  // Store the email address in the session
  req.session.data['emailAddress'] = req.body.emailAddress;

  // Redirect to the next page
  res.redirect('/confirmation');
});


module.exports = router;  // Export the router at the end of the file
