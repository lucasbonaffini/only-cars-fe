import React from "react";
import { Link } from "react-router-dom";
import "./MediaCard.css";
import logo from "../../img/OnlyCars_2.png";
import CarRentalIcon from "@mui/icons-material/CarRental";
import NumbersIcon from "@mui/icons-material/Numbers";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function MediaCard({
	name,
	description,
	carId,
	carImage,
}) {
	const truncateName = (name) => {
		if (name.length > 20) {
			return name.substring(0, 20) + "...";
		} else {
			return name;
		}

	};

	const truncateDescription = (description) => {
		if (description.length > 200) {
			return description.substring(0, 200) + "...";
		} else {
			return description;
		}
	}

	const productPath = `/producto/${carId}`;

	return (
		<div className="cardDiv">
			<Link to={productPath} className="link">
				<section>
					<article className="car-card">
						<div className="div-photo">
							<img className="logo" src={logo} alt="" />
							<img className="photo" src={carImage} alt="" />
						</div>

						<div className="body2">
							<h5 className="card-name">
								<CarRentalIcon />
								{truncateName(name)}
							</h5>
							<p className="car-id">
								<NumbersIcon /> {carId}
							</p>
							<p className="car-description">
								<ArrowRightIcon />
								{truncateDescription(description)}
							</p>
						</div>
					</article>
				</section>
			</Link>
		</div>
	);
}
