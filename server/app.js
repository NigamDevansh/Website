require("dotenv").config();
const { checkForAuthenticationCookie } = require("./middleware/checkAuthToken");
const { connectToMongoDB } = require("./connect");
const registerRoute = require("./router/registerRoute");
const sThreeBucket = require("./router/sThreeBucket");
const gDrive = require("./router/gDrive");
const loginRoute = require("./router/loginRoute");
const setCreds = require("./router/setCreds");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;
const allowedOrigin = "http://localhost:5173";
app.use(
	cors({
		origin: allowedOrigin,
		credentials: true,
	}),
);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDb Connect
const URL = process.env.MONGODB_URL;
connectToMongoDB(URL).then(() => console.log("Mongodb connected"));

// Middleware

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

// Server Check
app.get("/", (req, res) => {
	res.send("Hi !");
});

// api
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/s3", sThreeBucket);
app.use("/gdrive", gDrive);
app.use("/setcreds", setCreds);

app.listen(PORT, () =>
	console.log(`Server Started at PORT:${PORT}  http://localhost:${PORT}/`),
);
