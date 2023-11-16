import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Routes/Home/Home";
import ProductDetail from "./Routes/ProductDetail/ProductDetail";
import ProductsList from "./Routes/ProductsList/ProductsList";
import AddProduct from "./Routes/AddProduct/AddProduct";
import AddFeature from "./Routes/AddFeature/AddFeature";
import { AddCategory } from "./Routes/AddCategory/AddCategory";
import { routes } from "./Utils/routes";
import "./App.css";
import Admin from "./Layouts/Admin/Admin";
import EditProduct from "./Routes/EditProduct/EditProduct";
import FavCar from "./Routes/FavCar/FavCar";
import { Profile } from "./Routes/Profile/Profile";
import { LinkedinSection } from "./Routes/LinkedinSection/LinkedinSection";
import ReservationsHistory from "./Routes/ReservationsHistory/ReservationsHistory";
import { ReservationOk } from "./Routes/RservationOk/ReservationOk";

function App() {
	return (
		<div className="app">
			<Navbar />
			<Routes>
				<Route path={routes.home} element={<Home />} />
				<Route
					path={routes.productDetail}
					element={<ProductDetail />}
				/>
				<Route
					path={routes.reservationOk}
					element={<ReservationOk />}
				/>
				<Route path={routes.admin} element={<Admin />}>
					<Route path={routes.addProduct} element={<AddProduct />} />
					<Route
						path={routes.editProduct}
						element={<EditProduct />}
					/>
					<Route
						path={routes.productsList}
						element={<ProductsList />}
					/>
					<Route path={routes.category} element={<AddCategory />} />
					<Route path={routes.features} element={<AddFeature />} />
				</Route>
				<Route path={routes.profile} element={<Profile />} />
				<Route path={routes.favorites} element={<FavCar />} />
				<Route path={routes.linkedin} element={<LinkedinSection />} />
				<Route
					path={routes.reservationsHistory}
					element={<ReservationsHistory />}
				/>
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
