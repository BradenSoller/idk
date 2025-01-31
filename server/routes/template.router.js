const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const cloudinaryUpload = require("../modules/cloudinary.config");

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
router.post('/', cloudinaryUpload.single("image"), async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileUrl = req.file.path; // Cloudinary URL of the uploaded file
    const title = req.body.title;
    console.log("fileUrl", fileUrl);
    

    // Ensure the title is provided
    if (!title) {
      return res.status(400).send("Title is required.");
    }

    // SQL query for inserting the anime data
    const query = `
      INSERT INTO "anime" ("title", "image")
      VALUES ($1, $2)
      RETURNING "id";
    `;

    const values = [title, fileUrl];

    // Execute the query
    const result = await pool.query(query, values);

    // If insert is successful, return the anime ID
    if (result.rows.length > 0) {
      res.status(201).json({
        message: "Anime added successfully",
        id: result.rows[0].id
      });
    } else {
      res.status(500).send("Failed to add anime");
    }
  } catch (err) {
    console.error('POST route failed:', err);
    res.status(500).send("Server error");
  }
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

router.delete("/:id", (req, res) => {
  const query = `
      DELETE FROM "anime"
      WHERE "id" = $1;
    `;
  const values = [req.params.id];

  pool
    .query(query, values)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error("DELETE route failed:", err);
      res.sendStatus(500);
    });
});


module.exports = router;
