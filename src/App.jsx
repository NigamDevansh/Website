import React from "react";
import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
	useLocation,
} from "react-router-dom";
import "./app.scss";
import Navbar from "./components/Navbar/navbar";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Main from "./pages/Main/main";

function App() {
	const Layout = () => {
		const location = useLocation();
		const isRegisterRoute = location.pathname === "/register";
		return (
			<div className="app">
				{!isRegisterRoute && <Navbar />}
				{/* this part is an array of routes and navbar static in all pages */}
				<Outlet />
			</div>
		);
	};

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <Login />,
				},
				{
					path: "/main",
					element: <Main />,
				},
				{
					path: "/register",
					element: <Register />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
