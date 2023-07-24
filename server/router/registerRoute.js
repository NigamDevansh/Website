const { Router } = require("express");
const { createTokenForUser, validateToken } = require("../services/authJWT");
const User = require("../model/userSchema");
const router = Router();

router.post("/", async (req, res) => {
	const { name, username, password } = req.body;
	const user = await User.create({
		name,
		username,
		password,
	});
	const userDetails = {
		name: user.name,
	};
	const token = createTokenForUser(userDetails);
	return res
		.status(200)
		.cookie("token", token, {
			maxAge: 3600000,
			httpOnly: true,
			secure: true,
		})
		.json({
			status: true,
			data: { ...userDetails },
			meta: { token },
		});
});

module.exports = router;
