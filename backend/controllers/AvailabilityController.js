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

    const userId = decodedToken.userId;

    const availabilities = await Availability.find({ user: userId }).sort({ date: 1, startTime: 1 });

    res.status(200).json({ availabilities });
  } catch (error) {
    console.error('Error fetching availabilities:', error);
    res.status(500).json({ message: "Error fetching availabilities", error: error.message });
  }
}

  module.exports = {
    addAvailability,
    getAvailabilities
  }