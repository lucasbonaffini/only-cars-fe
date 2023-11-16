import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddProduct = () => {
	const { register, handleSubmit } = useForm();
	const [show, setShow] = useState(false);
	const [categories, setCategories] = useState([]);
	const [selectedFeature, setSelectedFeature] = useState(null);
	const [price, setPrice] = useState(0);

	const productFeatures = [
		{
			id: 1,
			title: "Motor de Combustión Interna",
			icon: "🔌",
		},
		{
			id: 2,
			title: "Transmisión Automática",
			icon: "🚙",
		},
		{
			id: 3,
			title: "Tracción Delantera",
			icon: "🚗",
		},
		{
			id: 4,
			title: "Tracción Trasera",
			icon: "🚗",
		},
		{
			id: 5,
			title: "Tracción en las Cuatro Ruedas",
			icon: "🚗",
		},
		{
			id: 6,
			title: "Capacidad para 5 Pasajeros",
			icon: "👥",
		},
		{
			id: 7,
			title: "Consumo Eficiente de Combustible",
			icon: "⛽",
		},
		{
			id: 8,
			title: "Sistema de Navegación",
			icon: "🗺️",
		},
		{
			id: 9,
			title: "Techo Solar",
			icon: "☀️",
		},
		{
			id: 10,
			title: "Sistemas Avanzados de Seguridad",
			icon: "🛡️",
		},
	];

	const categoryUrl = `${import.meta.env.VITE_API_URL}/categorias`;

	useEffect(() => {
		axios.get(categoryUrl).then((res) => {
			setCategories(res.data);
		});
	}, []);

	const onSubmitForm = async (data) => {
		const formData = new FormData();

		formData.append("name", data.name);
		formData.append("model", data.model);
		formData.append("description", data.description);

		const selectedCategory = data.category;
		formData.append("vehicule_category.id", selectedCategory);

		if (selectedFeature) {
			formData.append("addedFeatures", selectedFeature);
		}

		formData.append("price", price);

		for (let i = 0; i < data.files.length; i++) {
			formData.append("files", data.files[i]);
		}

		try {
			await axios.post(
				`${import.meta.env.VITE_API_URL}/productos`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			setShow(true);
		} catch (error) {
			console.error("Error al realizar el envío del formulario:", error);
			setShow(false);
		}
	};

	return (
		<div id="addCar">
			<form onSubmit={handleSubmit(onSubmitForm)} className="addCarForm">
				<h3>AGREGAR PRODUCTO</h3>
				<input
					className="input-name"
					name="name"
					type="text"
					placeholder="Ingrese Nombre"
					{...register("name")}
				/>
				<input
					name="model"
					type="text"
					placeholder="Ingrese Modelo"
					{...register("model")}
				/>
				<textarea
					name="description"
					placeholder="Ingrese descripción del automóvil"
					{...register("description")}
				/>
				<input
					name="files"
					type="file"
					accept="image/*"
					multiple
					{...register("files")}
				/>
				<label htmlFor="selectOption">Selecciona una categoría:</label>
				<select name="category" {...register("category")}>
					<option value="">Selecciona...</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.title}
						</option>
					))}
				</select>
				<label htmlFor="selectFeature">
					Selecciona una característica:
				</label>
				<select
					name="feature"
					onChange={(e) => setSelectedFeature(e.target.value)}
					value={selectedFeature || ""}>
					<option value="">Selecciona...</option>
					{productFeatures.map((feature) => (
						<option key={feature.id} value={feature.id}>
							{feature.title}
						</option>
					))}
				</select>
				<button type="submit">Cargar auto</button>
			</form>
			{show && <h4> Gracias, tu nuevo auto está listo para rentar</h4>}
		</div>
	);
};

export default AddProduct;
