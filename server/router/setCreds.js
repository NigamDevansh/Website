const { Router } = require("express");
const { createTokenForUser } = require("../services/authJWT");
const router = Router();

router.post("/", async (req, res) => {
	const { name } = req.body;
	console.log(req.body);
	const userDetails = {
		name: name,
	};
	const token = createTokenForUser(userDetails);
	console.log(token);
	return res
		.status(200)
		.cookie("token", token, {
			maxAge: 3600000,
			httpOnly: true,
			secure: true,
		})
		.json({ status: "Done" });
});

module.exports = router;
