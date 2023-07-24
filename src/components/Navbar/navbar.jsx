import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
	};

	const currentUser = JSON.parse(localStorage.getItem("name"));

	return (
		<div className="container">
			<div className="content">
				<img src="src\assets\logo.jpg"></img>
				{currentUser ? (
					<div className="name" onClick={handleLogout}>
						Hi! {currentUser}
					</div>
				) : (
					<Link className="link" to="/register">
						<span>Signup</span>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
