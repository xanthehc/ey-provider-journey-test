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

  



module.exports = router;  // Export the router at the end of the file
