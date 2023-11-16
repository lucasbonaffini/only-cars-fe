import axios from "axios";
import { useState } from "react";
import "./AddCategory.css";

export function AddCategory() {
	const categoryUrl = `${import.meta.env.VITE_API_URL}/categorias/categorias`;

	const [title, setTitle] = useState("");
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false); // Estado para controlar el estado de carga

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("title", title);
		formData.append("file", file);
		formData.append("description", description);

		try {
			setLoading(true); // Iniciar el estado de carga

			const response = await axios.post(categoryUrl, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			window.confirm("Categoría creada");
		} catch (error) {
			console.error("Error al crear categoría:", error);
			alert("Error al crear categoría");
		} finally {
			setLoading(false); // Finalizar el estado de carga
			//limpiar los campos
			setTitle("");
			setFile(null);
		}
	};

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	return (
		<div id="categoria">
			<h1>AGREGAR CATEGORÍA</h1>
			<form className="form-category" onSubmit={handleSubmit}>
				<label htmlFor="title">Título</label>
				<input
					type="text"
					name="title"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label htmlFor="description">Descripción</label>
				<textarea
					style={{ resize: "none", height: "100px" }}
					type="text"
					name="description"
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<label htmlFor="file">Imagen</label>
				<input
					type="file"
					name="file"
					id="file"
					onChange={handleFileChange}
				/>

				<button type="submit" disabled={loading}>
					{" "}
					{/* Deshabilitar el botón mientras está cargando */}
					{loading ? "Loading..." : "Agregar"}{" "}
					{/* Cambiar el texto del botón según el estado de carga */}
				</button>
			</form>

			<div className="preview">
				{file && (
					<>
						<h2>{title}</h2>
						<h3>{description}</h3>
						<img
							src={URL.createObjectURL(file)}
							alt="Preview"
							className="preview-image"
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default AddCategory;