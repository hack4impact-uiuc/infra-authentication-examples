const router = require("express").Router();

router.post("/securityQuestionForUser", async function(req, res) {
  const results = await fetch("http://localhost:8000/securityQuestionForUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: req.body.email
    })
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
