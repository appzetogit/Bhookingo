import express from 'express';
import {
    placesAutocompleteController,
    placeDetailsController,
    geocodeController
} from '../controllers/driving.controller.js';

// Google Places proxy shared by the customer and restaurant apps. The Google
// key stays server-side; mounted under /food/places with auth + role guard in
// routes/index.js so both USER and RESTAURANT tokens can search locations.
const router = express.Router();

router.get('/places-autocomplete', placesAutocompleteController);
router.get('/place-details', placeDetailsController);
router.get('/geocode', geocodeController);

export default router;
