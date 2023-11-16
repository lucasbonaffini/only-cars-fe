import axios from "axios";
import { useEffect, useState } from "react";
import "./CategoriesFilter.css";
import TuneIcon from "@mui/icons-material/Tune";
import NumbersIcon from "@mui/icons-material/Numbers";

const CategoriesFilter = ({
	onCategoryClick,
	selectedCategoryId,
	filterResults,
}) => {
	const [categories, setCategories] = useState([]);
	const categoriesUrl = `${import.meta.env.VITE_API_URL}/categorias`;

	useEffect(() => {
		try {
			axios(categoriesUrl).then((res) => {
				setCategories(res.data);
			});
		} catch (error) {
			console.error("Error al obtener categories:", error);
		}
	}, []);

	const handleCategoryClick = (categoryId) => {
		onCategoryClick(categoryId);
	};

	return (
		<div className="product-filter-container">
			<div className="category-list">
				{categories.map((category, index) => (
					<div
						key={category.id}
						className={`category-item ${
							selectedCategoryId.includes(category.id)
								? "category-item-selected"
								: ""
						}`}
						onClick={() => handleCategoryClick(category.id)}
						style={{ backgroundImage: `url(${category.image})` }}>
						<TuneIcon className="icon-filter" />
						<h3>{category.title}</h3>
					</div>
				))}
				<div className="results-container">
					<NumbersIcon className="icon-filter" />
					Resultado: {filterResults}
				</div>
			</div>
		</div>
	);
};

export default CategoriesFilter;
