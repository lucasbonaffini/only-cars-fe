import React from "react";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import MediaCard from "../../Components/MediaCard/MediaCard";
import { Alert, AlertTitle } from "@mui/material";
import "./FavCar.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavCar = () => {
	const { user, isAuthenticated, state } = useAuth();
	if (isAuthenticated()) {
		return (
			<div className="card">
				<div className="cardFav">
					<div className="cardTitle">
						<h1>
							<FavoriteBorderIcon
								sx={{ paddingRight: "5px", fontSize: "1.5rem" }}
							/>
							Mis favoritos
						</h1>
					</div>
					{state.favs.length == 0 ? (
						<h2>
							Sabemos que es difícil elegir favoritos entre
							nuestras máquinas, pero seguramente alguna ganó tu
							❤️
						</h2>
					) : (
						state.favs.map((fav, index) => (
							<MediaCard
								key={index}
								name={fav.name}
								description={fav.description}
								carBrand={fav.brand}
								price={fav.price}
								carId={fav.id}
								carImage={fav.image}
							/>
						))
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className="admin_container_error">
				<Alert variant="filled" severity="error">
					<AlertTitle>Error de autorización</AlertTitle>
					No estás autorizado para acceder a esta página.
				</Alert>
			</div>
		);
	}
};

export default FavCar;
