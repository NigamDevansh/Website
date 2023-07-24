import "./login.scss";
import { useEffect, useState } from "react";
import { auth, provider } from "../../auth/config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleAuth = async (e) => {
		signInWithPopup(auth, provider).then(async (data) => {
			const email = data.user.email;
			const username = email.split("@")[0];
			localStorage.setItem("name", JSON.stringify(username));

			const dataToSend = {
				name: username,
			};

			try {
				const response = await axios.post(
					"http://localhost:8080/setcreds/",
					dataToSend,
					{
						withCredentials: true, // Include credentials (cookies) with the request
					},
				);

				console.log(response.data);
				localStorage.setItem("name", JSON.stringify(username));
				navigate("/main");
			} catch (error) {
				console.error("Error during POST request:", error);
			}
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = {
				username: username,
				password: password,
			};

			const response = await axios.post(
				"http://localhost:8080/login/",
				data,
				{
					withCredentials: true, // Include credentials (cookies) with the request
				},
			);

			console.log(response.data.data);
			localStorage.setItem(
				"name",
				JSON.stringify(response.data.data.name),
			);
			navigate("/main");
		} catch (error) {
			console.error("Error during POST request:", error);
		}
	};

	useEffect(() => {
		const currentUser = JSON.parse(localStorage.getItem("name"));
		if (currentUser) {
			navigate("/main");
		}
	}, []);

	return (
		<div className="loginContainer">
			<div className="flexContainer">
				<div className="top">
					<button
						type="button"
						className="login-with-google-btn"
						onClick={handleAuth}>
						Login with Google
					</button>
				</div>

				<span>OR</span>
				<div className="bottom">
					<br />
					<input
						type="text"
						id="username"
						name="username"
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>

					<br />
					<input
						type="password"
						id="pwd"
						name="pwd"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					className="submitBtn"
					type="submit"
					onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Login;
