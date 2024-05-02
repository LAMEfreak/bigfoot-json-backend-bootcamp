import express from "express";
import getSightings from "./utils.js";
import { config } from "dotenv";
import cors from "cors";

config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  
  // Define year and month query parameters
  const { year, month } = req.query;

  // Initialize filteredSightings to all sightings
  let filteredSightings = sightings;

  // If year query parameter is present, filter sightings by year
  if (year) {
    filteredSightings = filteredSightings.filter(
      (sighting) => sighting["YEAR"] === year
    );
  }

  // If month query parameter is present, filter sightings by month
  if (month) {
    filteredSightings = filteredSightings.filter(
      (sighting) => sighting["MONTH"] === month
    );
  }

  // Return filtered sightings
  res.json(filteredSightings);
});

app.get("/sightings/:sightingsIndex", async (req, res) => {
  const sightings = await getSightings();
  const sightingsIndex = req.params.sightingsIndex;
  res.json(sightings[sightingsIndex]);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
