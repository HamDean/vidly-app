const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Rentals")
})

module.exports = router