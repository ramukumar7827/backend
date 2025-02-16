const express = require("express");
const router = express.Router();



router.post("/postFlightsData", (req, res) => {
  try {
    res.send([global.flights_data]);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
