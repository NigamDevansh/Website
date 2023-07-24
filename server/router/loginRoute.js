const { Router } = require("express");
const { validateToken } = require("../services/authJWT");
const User = require("../model/userSchema");
const router = Router();

router.post("/", async (req, res) => {
	const { username, password } = req.body;
	try {
		console.log(req.body);
		const token = await User.matchedPasswordandGenerateToken(
			username,
			password,
		);

		const payload = validateToken(token);
		delete payload.iat;
		delete payload._id;
		console.log(payload);
		return res
			.status(200)
			.cookie("token", token, {
				maxAge: 3600000,
				httpOnly: true,
				secure: true,
			})
			.json({
				data: { ...payload },
			});
	} catch (error) {
		return res.status(400).json({
			success: false,
			errors: error.message,
		});
	}
});

module.exports = router;
