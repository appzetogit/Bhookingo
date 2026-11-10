import express from 'express';
import {
    getPublicDrivingModeSettingsController,
    getRestaurantsAheadController,
    getGoogleRouteHighwayController,
    placesAutocompleteController,
    placeDetailsController,
    geocodeController
} from '../controllers/driving.controller.js';

const router = express.Router();

router.get('/settings', getPublicDrivingModeSettingsController);
router.get('/restaurants', getRestaurantsAheadController);
router.post('/restaurants', getRestaurantsAheadController);
router.get('/google-route-highway', getGoogleRouteHighwayController);
router.get('/places-autocomplete', placesAutocompleteController);
router.get('/place-details', placeDetailsController);
router.get('/geocode', geocodeController);

export default router;
