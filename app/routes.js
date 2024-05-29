// Load environment variables from .env file
require('dotenv').config();
console.log("NOTIFYAPIKEY:", process.env.NOTIFYAPIKEY);
const NotifyClient = require('notifications-node-client').NotifyClient;

const express = require('express');
const router = express.Router();  // Declare the router variable only once


// Handle POST request from the claimant-name form
router.post('/claimant-name', function(req, res) {
    // Assuming you have session middleware configured as shown before
    req.session.firstName = req.body.firstName;
    res.redirect('/start-date');
});

router.get('/start-date', function(req, res) {
    if (req.session && req.session.firstName) {
        res.render('start-date', {
            'data': { 'first-name': req.session.firstName }
        });
    } else {
        console.log('No firstName in session, redirecting to /claimant-name');
        res.redirect('/claimant-name');
    }
});

router.post('/current-school', function(req, res) {
    // Assuming you have session middleware configured as shown before
    req.session.nurseryName = req.body.nurseryName;
    res.redirect('/start-date');
});

router.get('/start-date', function(req, res) {
    if (req.session && req.session.nurseryName) {
        res.render('start-date', {
            'data': { 'nursery-name': req.session.nurseryName }
        });
    } else {
        console.log('No nurseryName in session, redirecting to /current-school');
        res.redirect('/current-school');
    }
});



// Define route for handling the form submission
router.post('/start-date', (req, res) => {
    // Extract the start date from the form submission
    const { startDay, startMonth, startYear } = req.body;

    // Create a Date object from the extracted start date
    const startDate = new Date(`${startYear}-${startMonth}-${startDay}`);

    // Check if the start date is after 15 May 2024
    const eligibilityDate = new Date('2024-05-15');
    if (startDate > eligibilityDate) {
        // Redirect to the child-facing route
        return res.redirect('/child-facing');
    } else {
        // Redirect to '/ineligible-start-date'
        return res.redirect('/ineligible-start-date');
    }
});

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
