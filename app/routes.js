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

router.post('/start-date', function(req, res) {
    // Assuming you have session middleware configured as shown before
    req.session.twentyFourWeeksBefore = req.body.twentyFourWeeksBefore;
    res.redirect('/returner-A');
});

router.get('/returner-A', function(req, res) {
    if (req.session && req.session.twentyFourWeeksBefore) {
        res.render('returner-A', {
            'data': { 'twenty-four-weeks-before': req.session.twentyFourWeeksBeforeDate }
        });
    } else {
        console.log('No twentyFourWeeksBefore in session, redirecting to /start-date');
        res.redirect('/start-date');
    }
});

module.exports = router;  // Export the router at the end of the file
