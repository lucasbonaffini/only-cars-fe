import axios from "axios";
import { useEffect, useState } from "react";
import MediaCard from "../../Components/MediaCard/MediaCard";
import "./Home.css";
import CategoriesFilter from "../../Components/CategoriesFilter/CategoriesFilter";
import { CarBrand } from "../../Components/CarBrand/CarBrand";
import { FormSearch2 } from "../../Components/FormSearch/SearchForm2";
import "../../index.css";

const Home = () => {
	const [cars, setCars] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selectedCategoryId, setSelectedCategoryId] = useState([]);
	const [categoryList] = useState([]);
	const [reservationFilter, setReservationFilter] = useState([]);

	const productsUrl = `${import.meta.env.VITE_API_URL}/productos`;

	const goTopSmooth = () => {
			window.scrollTo({
			top: 600,
			behavior: "smooth",
		});
	};

	const randomizeArray = (arr) => {
		let currentIndex = arr.length,
			randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[arr[currentIndex], arr[randomIndex]] = [
				arr[randomIndex],
				arr[currentIndex],
			];
		}

		return arr;
	};

	useEffect(() => {
		try {
			axios(productsUrl).then((res) => {
				let sortedArr = randomizeArray(res.data);
				setCars(sortedArr);
			});
		} catch (error) {
			console.error(
				"Error al obtener autos disponibles en alquiler:",
				error
			);
		}
		const handleResize = () => {
			if (window.innerWidth < 1023) {
				setItemsPerPage(5);
				setCurrentPage(1);
			} else {
				setItemsPerPage(10);
			}
		};
		handleResize();
	}, []);

	const filteredCars = cars.filter((car) => {
		return (
			!reservationFilter.includes(car.id) &&
			(selectedCategoryId.length === 0 ||
				selectedCategoryId.includes(car.vehicule_category.id))
		);
	});

	const handleCategoryChange = (categoryId) => {
		const updatedSelectedCategoryIds = [...selectedCategoryId];
		const index = updatedSelectedCategoryIds.indexOf(categoryId);

		if (index === -1) {
			updatedSelectedCategoryIds.push(categoryId);
		} else {
			updatedSelectedCategoryIds.splice(index, 1);
		}

		setSelectedCategoryId(updatedSelectedCategoryIds);
	};

	const handleReservationFilter = (array) => {
		setReservationFilter(array);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

	const pageLinks = Array.from({ length: totalPages }, (_, index) => (
		<button
			key={index}
			className={currentPage === index + 1 ? "activeButton" : ""}
			onClick={() => {setCurrentPage(index + 1); setTimeout(goTopSmooth, 0);}}>
			{index + 1}
		</button>
	));

	return (
		<main className="main">
			<figure className="figure-header">
				<article className="container-title">
					<h1>EXPLORA EL CAMINO A TU MANERA</h1>
					<p>
						Descubre nuestra amplia gama de vehículos, diseñados
						para adaptarse a tu estilo único.{" "}
					</p>
					<p>
						Encuentra la opción perfecta para tus viajes y vive una
						experiencia personalizada al volante.
					</p>
				</article>
			</figure>

			<FormSearch2
				categories={categoryList}
				onCategoryClick={handleCategoryChange}
				passReservationArray={handleReservationFilter}
				filterResults={filteredCars.length}
			/>
			<div className="filter-brand-container">
				<CarBrand />
				<CategoriesFilter
					onCategoryClick={handleCategoryChange}
					selectedCategoryId={selectedCategoryId}
					filterResults={filteredCars.length}
				/>
			</div>

			<section className="recom">
				{filteredCars.slice(startIndex, endIndex).map((el, index) => (
					<MediaCard
						key={index}
						name={el.name}
						description={el.description}
						carBrand={el.car_brand}
						price={el.price}
						carId={el.id}
						carImage={el.images[0].url}
					/>
				))}
			</section>
			<div className="pagination">
				<button
					className={currentPage === 1 ? "buttonDisabled" : ""}
					disabled={currentPage === 1}
					onClick={() => {setCurrentPage(currentPage - 1); setTimeout(goTopSmooth, 0);}}>
					{"<"}
				</button>
				{pageLinks}
				<button
					className={
						endIndex >= filteredCars.length ? "buttonDisabled" : ""
					}
					disabled={endIndex >= filteredCars.length}
					onClick={() => {setCurrentPage(currentPage + 1); setTimeout(goTopSmooth, 0);}}>
					{">"}
				</button>
			</div>
		</main>
	);
};

export default Home;
