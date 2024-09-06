const express = require('express');
const router = express.Router();
const {addAvailability,getAvailabilities,updateAvailabilities,deleteAvailabilities} = require("../controllers/AvailabilityController");

router.post('/add-availability', addAvailability);

router.get("/get-availabilities", getAvailabilities);

router.put("/update-availability/:id", updateAvailabilities);

router.delete("/delete-availability/:id", deleteAvailabilities);

module.exports = router;