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
  const query = `
  INSERT INTO "anime" ("title")
    VALUES ($1);
  `
  const values = [
    req.body.title,
  ]

  console.log("dssdcsdc")
  pool
    .query(query, values)
    .then(result => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error('POST route failed:', err)
      res.sendStatus(500)
    })
   
});


router.put('/status/:id', (req, res) => {
  
  const sqlText = `
  UPDATE "anime"
   SET "is_liked" = NOT "is_liked"
   WHERE "id" = ${req.params.id};
    `

  pool.query(sqlText)
  .then((dbResult) =>{
      res.sendStatus(200);
  })
  .catch((dbError)=>{
      console.log('PUT /status:id failed', dbError)
      res.sendStatus(500);
  })
});


module.exports = router;
