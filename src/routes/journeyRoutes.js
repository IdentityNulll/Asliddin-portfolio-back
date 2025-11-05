const express = require('express');
const router = express.Router();
const {
    getJourney,
    createJourney,
    updateJourney,
    deleteJourney
} = require('../controllers/journeyController');

router.get('/', getJourney);
router.post('/', createJourney);
router.put('/:id', updateJourney);
router.delete('/:id', deleteJourney);

module.exports = router;    