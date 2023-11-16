import React, { useState } from "react";
import "./Gallery.css";
import FullGallery from "../FullGallery/FullGallery";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import placeholderImage from "../../img/no-photo.jpg";
import Calendar from "./Calendar.jsx";
import banner from "../../img/banner2.png";
import ShareModal from "../Share/Share";
import ShareIcon from "@mui/icons-material/Share";
import { useAuth } from "../AuthContext/AuthContext";
import { da } from "date-fns/locale";

const Gallery = ({ product }) => {
	const {
		images: productImages,
		name: productName,
		description: productDescription,
		price: productPrice,
		id: productId,
	} = product;

	const [showFullGallery, setShowFullGallery] = useState(false);
	const [showText, setShowText] = useState(false);
	const [open, setOpen] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const [selectedFeature, setSelectedFeature] = useState([]);

	const dataUser = useAuth();
	const userEmail = dataUser?.user?.email;
	const userFirstName = dataUser?.user?.firstname;

	const handleShareClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setShowShareModal(false);
	};

	const carFeatures = [
		{ name: "Aire acondicionado", icon: "❄️", value: "aire" },
		{ name: "Radio FM/AM", icon: "📻", value: "radio" },
		{ name: "Navegación GPS", icon: "🗺️", value: "gps" },
		{ name: "Asientos de cuero", icon: "🛋️", value: "cuero" },
		{ name: "Sonido premium", icon: "🎵", value: "sonido" },
		{ name: "Cámara de retroceso", icon: "📷", value: "camara" },
		{ name: "Techo panorámico", icon: "🌞", value: "techo" },
		{ name: "Control de crucero", icon: "🚘", value: "control" },
		{ name: "Sensor estacionamiento", icon: "🅿️", value: "sensor" },
		{ name: "Asientos calefaccionados", icon: "🔥", value: "calefaccion" },
	];

	const handleFeatureSelection = (event) => {
		event.preventDefault();
		const selectedFeature = event.target.value;

		let selectedFeatureName = "";
		for (const feature of carFeatures) {
			if (feature.value === selectedFeature) {
				selectedFeatureName = feature.name;
				break;
			}
		}

		if (selectedFeatureName) {
			alert(`Se seleccionó la característica: ${selectedFeatureName}`);
			setSelectedFeature(selectedFeature);
		}
	};

	const handleMouseEnter = () => {
		setShowText(true);
	};

	const handleMouseLeave = () => {
		setShowText(false);
	};

	const toggleFullGallery = () => {
		setShowFullGallery(!showFullGallery);
	};
	const imageSkeleton = {
		url: "https://via.placeholder.com/300",
	};

	return (
		<article>
			<div className="gallery-container">
				<div className="main-image">
					<div
						className="image-container main-image-image"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}>
						<img
							src={productImages[0]?.url || imageSkeleton.url}
							alt="Main Image"
							className="main-image-inner"
						/>
						{showText && (
							<div
								className="overlay-main"
								onClick={toggleFullGallery}>
								Ver más
							</div>
						)}
					</div>
					<p className="description">
						<h2>Descripción</h2>
						<span>{product?.description}</span>
					</p>
					<p className="productId">Número de Auto #{product?.id}</p>
					<Calendar
						productId={product?.id}
						product= {product}
					/>
				</div>
				<div className="image-grid-container">
					<div className="image-grid">
						{Array.from({ length: 4 }, (_, index) => (
							<div
								key={index}
								className={`image-grid-item ${
									index === 3 && productImages[1]
										? "image-container"
										: ""
								}`}
								onMouseEnter={
									index === 3 ? handleMouseEnter : undefined
								}
								onMouseLeave={
									index === 3 ? handleMouseLeave : undefined
								}>
								{index + 1 < productImages.length ? (
									<img
										src={
											productImages[index + 1].url ||
											placeholderImage
										}
										alt={`Imagen ${index + 1}`}
										className={`image-grid-item ${
											index === 3 ? "image-container" : ""
										}`}
									/>
								) : (
									<img
										src={placeholderImage}
										alt={`Imagen ${index + 1}`}
										className="image-grid-item"
									/>
								)}
								{index === 3 &&
									productImages[1] &&
									showText && (
										<div
											className="overlay"
											onClick={toggleFullGallery}>
											{" "}
											Ver más{" "}
										</div>
									)}
							</div>
						))}
					</div>

					<div className="section-caracteristicas">
						<div className="caracteristicas-container">
							<h2>Características</h2>
						</div>
						<div className="characteristics">
							{carFeatures.map((feature, index) => (
								<div
									key={index}
									className="characteristics-item">
									<span className="feature-icon">
										{feature.icon}
									</span>
									<span className="feature-name">
										{feature.name}
									</span>
								</div>
							))}
						</div>
						<figure className="banner">
							<img src={banner} alt="" />
						</figure>
						<button
							className="share-button"
							onClick={handleShareClick}>
							<ShareIcon />
							Compartir Publicacíon
						</button>
					</div>
				</div>
				{showFullGallery && (
					<FullGallery
						images={productImages.map((image) => image.url)}
						onClose={toggleFullGallery}
					/>
				)}

				<Dialog
					open={open}
					onClose={handleClose}
					maxWidth="md"
					fullWidth>
					<DialogContent>
						<ShareModal
							product={product}
							onClose={() => setShowShareModal(false)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cerrar
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</article>
	);
};

export default Gallery;
