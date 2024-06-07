const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/anime', (req, res) => {
  const getAnimeDetails = 
  `
  SELECT * FROM "anime"
    
  `
 
  pool.query(getAnimeDetails)
  .then(result => {
    console.log("results.rows", result.rows);
    res.send(result.rows);
   
  })
  .catch((err) => {
    console.log("ERROR: Get all appointments", err);
    res.sendStatus(500);
  });

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
