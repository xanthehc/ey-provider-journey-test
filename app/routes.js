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
  if (returnerOne === "yes") {
      response.redirect("/employee-email");
  } else if (returnerOne === "I don't know") {
      response.redirect("/unsure");
  } else {
      response.redirect("/returner-2");
  }
});


router.post('/returner-2', function(request, response) {
  // Assuming session data is set properly with returnerOne
  var returnerTwo = request.session.data['returnerTwo'];

  if (returnerTwo === "yes") {
      response.redirect("/returner-3");
  } 
  else if (returnerTwo === "I don't know") {
    response.redirect("/unsure");
  }
  else {
      response.redirect("/employee-email");
  }
});

router.post('/returner-3', function(request, response) {
  // Assuming session data is set properly with returnerOne
  var returnerThree = request.session.data['returnerThree'];

  if (returnerThree === "no") {
      response.redirect("/ineligible");
  }
  else {
      response.redirect("/employee-email");
  }
});




module.exports = router;  // Export the router at the end of the file
