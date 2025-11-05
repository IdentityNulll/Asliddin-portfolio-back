const express = require('express'); 
const router = express.Router();
const {
    getAbout,
    createAbout,
    updateAbout,
    deleteAbout
} = require('../controllers/aboutController');

router.get('/', getAbout); 
router.post('/', createAbout);
router.put('/:id', updateAbout);
router.delete('/:id', deleteAbout);

module.exports = router;