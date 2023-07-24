import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.scss";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const data = {
				name: name,
				username: username,
				password: password,
			};

			const response = await axios.post(
				"http://localhost:8080/register/",
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

	return (
		<div className="registerContainer">
			<div className="registerMain">
				<input
					type="text"
					id="name"
					name="name"
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>

				<input
					type="password"
					id="pwd"
					name="pwd"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button
				className="registerBtn"
				type="submit"
				onClick={handleRegister}>
				Register
			</button>
		</div>
	);
};
export default Register;
