const router = require("express").Router();
const Place = require("../models/Place");

//creat a  pin for  a place

router.post("/", async (req, res) => {
  const newPlace = new Place(req.body);
  try {
    const savedPlace = await newPlace.save();
    res.status(200).json(savedPlace);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
