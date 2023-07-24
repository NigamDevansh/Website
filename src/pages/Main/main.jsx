import { useState, useEffect } from "react";
import "./main.scss";
import Card from "../../components/Card/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Main = () => {
	const [photos, setPhotos] = useState([]);

	const navigate = useNavigate();
	async function backendCall(call) {
		axios
			.get(`http://localhost:8080/${call}/photos`, {
				withCredentials: true, // Include cookies in the request
			})
			.then((response) => {
				// Handle the response data
				console.log(response.data);
				const photosArray = response.data;
				// setPhotos([]);
				setPhotos(photosArray);
			})
			.catch((error) => {
				// Handle any errors that occurred during the request
				console.error("Error during GET request:", error);
				alert(error.response.data.error);
			});
	}

	const s3Photos = async (e) => {
		await backendCall("s3");
	};

	const gDrivePhotos = async () => {
		await backendCall("gdrive");
	};

	useEffect(() => {
		const currentUser = JSON.parse(localStorage.getItem("name"));
		if (!currentUser) {
			navigate("/");
		}
	}, []);

	return (
		<div className="mainContainer">
			<div className="buttons">
				<span className="s3" onClick={s3Photos}>
					S3
				</span>
				<span className="gdrive" onClick={gDrivePhotos}>
					Google Drive
				</span>
			</div>
			<div className="photos">
				{photos.map((photo) => (
					<Card key={photo.key} card={photo} />
				))}
			</div>
		</div>
	);
};
export default Main;
