import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";
import Gallery from "../../Components/Gallery/Gallery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Favorite } from "@mui/icons-material";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import Politics from "../../Components/Politics/Politics";

const ProductDetail = () => {
	const [product, setProduct] = useState({
		id: 0,
		name: "",
		description: "",
		images: [],
	});
	const params = useParams();
	const productUrl = `${import.meta.env.VITE_API_URL}/productos/${params.id}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		axios(productUrl).then((res) => {
			setProduct(res.data);
		});
	}, []);
	const navigate = useNavigate();

	//FAVORITOS
	const { dispatch, isAuthenticated } = useAuth();
	const [carFav, setCarFav] = useState();
	const addFav = () => {
		dispatch({
			type: "ADD_FAV",
			payload: {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				brand: product.car_brand,
				image: product.images[0].url,
			},
		});
		setCarFav(true);
	};

	const removeFav = () => {
		dispatch({ type: "QUIT_FAV", payload: { id: product.id } });
		setCarFav(false);
	};

	return (
		<section className="container-horizontal">
			<div className="horizontal-name">
				<div className="name-container">
					<h2>{product?.name}</h2>
					{isAuthenticated() && (
						<div className="setFav">
							<button
								onClick={carFav ? removeFav : addFav}
								className="favButton">
								{carFav ? (
									<Favorite color="error" />
								) : (
									<Favorite color="disabled" />
								)}
							</button>
						</div>
					)}
				</div>

				<button
					className="btn-back-home"
					onClick={() => {
						navigate("/");
						window.scrollTo({
							top: 0.0,
							behavior: "smooth",
						});
					}}
					variant="outlined">
					<ArrowBackIcon sx={{ fontSize: 20 }} />
				</button>
			</div>
			<div className="horizontal-flex">
				<Gallery product={product} />
			</div>
			<div className="horizontal-politics">
				<Politics />
			</div>
		</section>
	);
};

export default ProductDetail;
