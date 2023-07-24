const { Router } = require("express");
const { google } = require("googleapis");
const router = Router();

//Google Drive --------------------------------------------------------------------------------------------
const credentials = require("./credentials.json");
const folderId = "1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS";
const auth = new google.auth.GoogleAuth({
	credentials: credentials,
	scopes: ["https://www.googleapis.com/auth/drive"],
});

async function fetchImagesFromFolder() {
	try {
		const driveService = google.drive({ version: "v3", auth });

		// Fetch all image files from the specified folder
		const response = await driveService.files.list({
			q: `'${folderId}' in parents and mimeType contains 'image/'`,
			fields: "files(id, webViewLink)",
		});

		const imageFiles = response.data.files;
		const imagesWithUrls = imageFiles.map((file) => {
			return {
				id: file.id,
				Key: file.webViewLink,
			};
		});

		return imagesWithUrls;
	} catch (error) {
		console.error("Error fetching images:", error.message);
	}
}
//------------------------------------------------------------------------------------------------------------
router.get("/photos", async (req, res) => {
	if (req.user === undefined) {
		return res.status(400).json({
			error: "Please signin!",
		});
	}
	const data = await fetchImagesFromFolder();
	return res.send(data);
});

module.exports = router;
