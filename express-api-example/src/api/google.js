const SERVER_URL = require("./../utils/globalServerUrl");
const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");

router.post("/google", async function(req, res) {
  const results = await fetch("http://localhost:8000/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tokenId: req.body.tokenId, 
      role: req.body.role
    })
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
