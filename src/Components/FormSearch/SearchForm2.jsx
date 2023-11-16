import "./FormSearch.css";
import "./InputSearch.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Checkbox.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import "./Reservation.css";
import { DateSearch } from "./DateSearch";
import "./OpenClose.css";

export function FormSearch2({
	onCategoryClick,
	passReservationArray,
	filterResults,
}) {
	const [searchInput, setSearchInput] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [isChecked, setIsChecked] = useState(false);

	const categoriesURL = `${import.meta.env.VITE_API_URL}/categorias`;

	useEffect(() => {
		try {
			axios(categoriesURL).then((res) => {
				setCategories(res.data);
			});
		} catch (error) {
			console.error("Error al obtener categories:", error);
		}
	}, []);

	const handleSearch = (categoryId) => {
		onCategoryClick(categoryId);
	};

	const handleInputChange = (e) => {
		const userInput = e.target.value;
		setSearchInput(userInput);

		const carsArray = categories.map((category) => category.title);

		if (userInput.trim() === "") {
			setSuggestions([]);
			setSearchResults([]);
		} else {
			const filteredSuggestions = carsArray.filter((suggestion) =>
				suggestion.toLowerCase().includes(userInput.toLowerCase())
			);

			setSuggestions(filteredSuggestions);

			const filteredResults = categories.filter((category) =>
				filteredSuggestions.includes(category.title)
			);

			setSearchResults(filteredResults);
		}
	};

	const handleSuggestionClick = (suggestion) => {
		console.log(suggestion);
		setSearchInput(suggestion);

		searchResults.map(
			(category) =>
				category.title === suggestion && handleSearch(category.id)
		);
		setSuggestions([]);
	};

	const handleReservationArray = (array) => {
		passReservationArray(array);
	};
	const handleCheck = () => {
		setIsChecked(!isChecked);
		const container = document.querySelector(".container-form");
		container.classList.toggle("container-form-active");
	};

	return (
		<>
			<form className="form-search" action="">
				<div className="container-form">
					<section className="form">
						<legend className="title">
							<DirectionsCarIcon />
							Encuentra tu auto
						</legend>
						<legend className="subtitle">
							*Ingresa las características de tu auto
						</legend>
						<input
							className="input-search"
							placeholder="Busca tu auto"
							required=""
							type="text"
							value={searchInput}
							onChange={handleInputChange}
						/>
						{searchResults.length > 0 && (
							<div className="suggestions-container">
								{suggestions.map((suggestion, index) => (
									<div
										key={index}
										className="suggestion"
										onClick={(e) => {
											e.preventDefault;
											handleSuggestionClick(suggestion);
										}}>
										{suggestion}
									</div>
								))}
							</div>
						)}

						<button className="search-button" type="submit">
							Refrescar
						</button>
						<div className="checkbox-container1 results">
							Resultados de búsqueda : {filterResults} vehículos
						</div>
					</section>
					<DateSearch onReservarClick={handleReservationArray} />
					<div className="openClose">
                        <label className="container">
                            <input
                                className="openClose-input"
                                checked={isChecked}
                                onClick={handleCheck}
                                type="checkbox"
                            />
                            <svg
                                viewBox="0 0 320 512"
                                height="1em"
                                xmlns="http://www.w3.org/2000/svg"
                                className="chevron-right">
                                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                            </svg>
                        </label>
                    </div>
				</div>
			</form>
		</>
	);
}
