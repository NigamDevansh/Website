const { Router } = require("express");
const router = Router();

//S3 Bucket code--------------------------------------------------------------------------------------------
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
	region: REGION,
	signer: {
		sign: async (request) => request,
	},
});
const run = async () => {
	const bucketParams = {
		Bucket: "testbucketfp",
	};
	console.log("hello");
	try {
		const data = await s3Client.send(new ListObjectsCommand(bucketParams));
		return data; // For unit tests.
	} catch (err) {
		console.log("Error", err);
	}
};
// -----------------------------------------------------------------------------------------------------

router.get("/photos", async (req, res) => {
	if (req.user === undefined) {
		return res.status(400).json({
			error: "Please signin!",
		});
	}
	let data = await run();

	//Code for pagination (but didn't handled it in the frontend so commenting it)----------------------------------------------------------------------
	// let total = data.length;
	// let items = 4;
	// let pages = parseInt(total / items);
	// let page = 1;
	// let start = (page - 1) * items;
	// let end = start + items;
	// let returnArray = [];
	// data.forEach((element, index) => {
	// 	if (index >= start && index <= end) {
	// 		returnArray.push(element);
	// 	}
	// });

	// return res.status(200).json({
	// 	status: true,
	// 	content: {
	// 		meta: {
	// 			total,
	// 			pages,
	// 			page,
	// 		},
	// 		data: returnArray,
	// 	},
	// });

	return res.send(data.Contents);
});

module.exports = router;
