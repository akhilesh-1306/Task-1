const express = require('express');
const router = express.Router();
const {addAvailability,getAvailabilities} = require("../controllers/AvailabilityController");

router.post('/add-availability', addAvailability);

router.get("/get-availabilities", getAvailabilities);

module.exports = router;