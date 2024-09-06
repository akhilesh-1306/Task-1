const AvailabilityModel = require("../models/Availability")
const jwt = require("jsonwebtoken")

const addAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime,token } = req.body;

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log(decodedToken);
    const userId = decodedToken._id;
    console.log(userId);

    // Create new availability
    const newAvailability = new AvailabilityModel({
      user: userId,
      date,
      startTime,
      endTime
    });

    // Save the availability
    await newAvailability.save();

    res.status(201).json({ message: "Availability added successfully", availability: newAvailability,success:true });
  } catch (error) {
    res.status(500).json({ message: "Error adding availability", error: error.message,success : false });
  }
  }

const getAvailabilities = async (req, res) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decodedToken._id;
    console.log(userId);
    const availabilities = await AvailabilityModel.find({ user: userId }).sort({ date: 1, startTime: 1 });
    // console.log(availabilities);

    res.status(200).json({ availabilities });
  } catch (error) {
    console.error('Error fetching availabilities:', error);
    res.status(500).json({ message: "Error fetching availabilities", error: error.message });
  }
}

const updateAvailabilities = async (req, res) => {
  try {
    // const {id} = req.params;
    const { id, user, date, startTime, endTime } = req.body;
    console.log("This is indise the updateAvailabilities");
    console.log(id);

    // Find the availability and check if it belongs to the current user
    let availability = await AvailabilityModel.findOne({ _id: id});

    if (!availability) {
      return res.status(404).json({ msg: 'Availability not found or not authorized' });
    }

    // Update the availability
    availability.date = date;
    availability.startTime = startTime;
    availability.endTime = endTime;

    await availability.save();

    res.json(availability);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const deleteAvailabilities = async (req, res) => {
  try {
    const {id}  = req.params;

    // Find the availability and check if it belongs to the current user
    let availability = await AvailabilityModel.findOne({ _id: id, user: req.user.id });

    if (!availability) {
      return res.status(404).json({ msg: 'Availability not found or not authorized' });
    }

    // Delete the availability
    await AvailabilityModel.findByIdAndRemove(id);

    res.json({ msg: 'Availability removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

  module.exports = {
    addAvailability,
    getAvailabilities,
    updateAvailabilities,
    deleteAvailabilities
  }