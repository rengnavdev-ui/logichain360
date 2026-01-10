const router = require("express").Router();

// Example placeholder route
router.get("/ping", (req, res) => {
  res.json({ pong: true });
});

module.exports = router;
